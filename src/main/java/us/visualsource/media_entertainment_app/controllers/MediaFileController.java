package us.visualsource.media_entertainment_app.controllers;

import java.io.IOException;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import jakarta.validation.Valid;
import jodd.net.MimeTypes;
import us.visualsource.media_entertainment_app.dto.request.FileUploadRequest;
import us.visualsource.media_entertainment_app.models.Media;
import us.visualsource.media_entertainment_app.repository.MediaRepository;
import us.visualsource.media_entertainment_app.services.FileSystemStorageService;
import us.visualsource.media_entertainment_app.services.JwtService;

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
    public @ResponseBody ResponseEntity<?> CreateMedia(
            @RequestPart(name = "metadata") @Valid FileUploadRequest metadata,
            @RequestPart(name = "file") MultipartFile file) throws IOException {


        String[] ext = MimeTypes.findExtensionsByMimeTypes(file.getContentType(), false);


        Media media = new Media(metadata.getUuid(), metadata.getName(), metadata.getReleaseYear(),
                metadata.getType(), metadata.getRating(), file.getContentType(),
                metadata.getThumbnail(), "#ffffff", metadata.getUuid().toString() + "." + ext[0]);

        storageService.store(file);
        mediaRepository.save(media);
        // https://stackoverflow.com/questions/56965687/change-the-name-of-multipartfile

        return ResponseEntity.status(HttpStatus.CREATED).body(media);
    }


    @GetMapping("/{uuid}/metadata")
    public ResponseEntity<?> GetFileMetadata() {
        return ResponseEntity.ok(null);
    }

    @GetMapping("/{filename:.+}")
    public ResponseEntity<?> GetFileDownload(@PathVariable String filename) {

        Resource file = storageService.loadAsResource(filename);
        if (file == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename\"" + file.getFilename() + "\"").body(file);
    }

    @PatchMapping("/{uuid}/metadata")
    public ResponseEntity<?> PatchFileMetadata() {
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/{uuid}")
    public ResponseEntity<?> DeleteFile() {
        return ResponseEntity.ok(null);
    }

}
