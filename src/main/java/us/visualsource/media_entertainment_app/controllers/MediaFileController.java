package us.visualsource.media_entertainment_app.controllers;

import java.nio.file.Files;
import java.nio.file.Path;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.util.Optional;
import java.util.UUID;
import org.apache.coyote.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;
import jakarta.validation.Valid;
import jodd.net.MimeTypes;
import us.visualsource.media_entertainment_app.dto.request.FileUploadRequest;
import us.visualsource.media_entertainment_app.models.Media;
import us.visualsource.media_entertainment_app.repository.MediaRepository;
import us.visualsource.media_entertainment_app.services.FileSystemStorageService;
import us.visualsource.media_entertainment_app.services.JwtService;
import us.visualsource.media_entertainment_app.util.NotFoundException;

@RestController
@RequestMapping("/api/file")
public class MediaFileController {

    @Autowired
    JwtService jwtService;

    @Autowired
    MediaRepository mediaRepository;

    @Autowired
    FileSystemStorageService storageService;

    private final Logger logger = LoggerFactory.getLogger(MediaFileController.class);

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public @ResponseBody ResponseEntity<Media> CreateMedia(
            @RequestPart(name = "metadata") @Valid FileUploadRequest metadata,
            @RequestPart(name = "file") MultipartFile file) throws IOException {

        Media media = storageService.store(file, metadata);

        if (media == null) {
            logger.error("Should not have reached this!");
            throw new RuntimeException("Returned file data was not set!");
        }

        mediaRepository.save(media);


        return ResponseEntity.status(HttpStatus.CREATED).body(media);
    }


    @GetMapping("/{uuid}/metadata")
    public ResponseEntity<Media> GetFileMetadata(@PathVariable("uuid") UUID id)
            throws NotFoundException, BadRequestException {
        if (id == null)
            throw new BadRequestException("uuid is invalid");

        Optional<Media> media = mediaRepository.findById(id);

        if (media.isEmpty()) {
            throw new NotFoundException("Failed to find item");
        }

        return ResponseEntity.ok(media.get());
    }

    @GetMapping("/{filename:.+}")
    public ResponseEntity<StreamingResponseBody> GetFileDownload(
            @PathVariable(value = "filename") String filename,
            @RequestHeader(value = "Range", required = false) String rangeHeader)
            throws IOException {

        Path filePath = storageService.loadAsResource(filename).getFile().toPath();

        logger.info(String.format("Load File from path: %s", filePath.toString()));

        long fileSize = Files.size(filePath);

        if (!StringUtils.hasText(rangeHeader)) {
            return storageService.loadFullMediaFile(filePath);
        } else {
            long rangeStart = 0L;
            long rangeEnd = 0L;

            logger.info("Read rang seeking value.");
            logger.info(String.format("Range values: [%s]", rangeHeader));

            int dashPos = rangeHeader.indexOf("-");

            if (dashPos > 0 && dashPos <= (rangeHeader.length() - 1)) {
                String[] rangesArr = rangeHeader.split("-");

                if (rangesArr != null && rangesArr.length > 0) {
                    logger.info(String.format("ArraySize: %d", rangesArr.length));

                    rangeStart = safeParseLong(rangesArr[0], 0L);

                    if (rangesArr.length > 1) {
                        logger.info(String.format("Range values[1]: [%s]", rangesArr[1]));
                        rangeEnd = safeParseLong(rangesArr[1], 0L);
                    } else {
                        if (fileSize > 0) {
                            rangeEnd = fileSize - 1L;
                        } else {
                            rangeEnd = 0L;
                        }
                    }
                }
            }

            if (rangeEnd == 0L && fileSize > 0L) {
                rangeEnd = fileSize - 1;
            }
            if (fileSize < rangeEnd) {
                rangeEnd = fileSize - 1;
            }

            return storageService.loadPartialMediaFile(filePath.toAbsolutePath(), rangeStart,
                    rangeEnd);
        }
    }

    @PatchMapping("/{uuid}/metadata")
    public ResponseEntity<?> PatchFileMetadata() {
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/{uuid}")
    public ResponseEntity<?> DeleteFile() {
        return ResponseEntity.ok(null);
    }

    private long safeParseLong(String val, long defaultLong) {
        long out = defaultLong;

        if (!StringUtils.hasText(val)) {
            return out;
        }

        String numericStr = val.replaceAll("[^0-9]", "");

        if (!StringUtils.hasText(numericStr)) {
            return out;
        }

        try {
            out = Long.parseLong(numericStr);
        } catch (NumberFormatException ex) {
            logger.error("Failed to pase range value using default", ex);
            out = defaultLong;
        }

        return out;
    }
}
