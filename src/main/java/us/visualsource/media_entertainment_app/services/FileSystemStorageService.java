package us.visualsource.media_entertainment_app.services;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.RandomAccessFile;
import java.net.MalformedURLException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.stream.Stream;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;
import jodd.net.MimeTypes;
import us.visualsource.media_entertainment_app.dto.request.FileUploadRequest;
import us.visualsource.media_entertainment_app.models.Media;
import us.visualsource.media_entertainment_app.util.*;

@Service
public class FileSystemStorageService {
    private final Path rootLocation;


    public FileSystemStorageService() {
        this.rootLocation = Paths.get("upload-dir");
        init();
    }

    public ResponseEntity<StreamingResponseBody> loadFullMediaFile(Path filePath)
            throws IOException {
        StreamingResponseBody responseStream;
        final HttpHeaders responseHeaders = new HttpHeaders();

        String mineType = Files.probeContentType(filePath);
        responseHeaders.add(HttpHeaders.CONTENT_TYPE, mineType);


        responseStream = os -> {
        };

        return new ResponseEntity<StreamingResponseBody>(responseStream, responseHeaders,
                HttpStatus.OK);
    }

    public ResponseEntity<StreamingResponseBody> loadPartialMediaFile(Path filePath, long fileStart,
            long fileEnd) throws IOException {
        StreamingResponseBody responseStream;

        if (!filePath.toFile().exists()) {
            throw new FileNotFoundException("The media file does not exist.");
        }

        long fileSize = Files.size(filePath);
        if (fileStart < 0L) {
            fileStart = 0L;
        }

        if (fileSize > 0L) {
            if (fileStart >= fileSize) {
                fileStart = fileSize - 1L;
            }

            if (fileEnd >= fileSize) {
                fileEnd = fileSize - 1L;
            }
        } else {
            fileStart = 0L;
            fileEnd = 0L;
        }

        byte[] buffer = new byte[1024];
        String mineType = Files.probeContentType(filePath);

        final HttpHeaders responseHeaders = new HttpHeaders();
        String contentLength = String.valueOf((fileEnd - fileStart) + 1);

        responseHeaders.add(HttpHeaders.CONTENT_TYPE, mineType);
        responseHeaders.add(HttpHeaders.CONTENT_LENGTH, contentLength);
        responseHeaders.add(HttpHeaders.ACCEPT_RANGES, "bytes");
        responseHeaders.add(HttpHeaders.CONTENT_RANGE,
                String.format("bytes %d-%d/%d", fileStart, fileEnd, fileSize));
        final long fileStartPos = fileStart;
        final long fileEndPos = fileEnd;

        responseStream = os -> {
            RandomAccessFile file = new RandomAccessFile(filePath.toFile(), "r");

            try (file) {
                long pos = fileStartPos;
                file.seek(pos);
                while (pos < fileEndPos) {
                    file.read(buffer);
                    os.write(buffer);
                    pos += buffer.length;
                }
                os.flush();
            } catch (Exception e) {
            }
        };

        return new ResponseEntity<StreamingResponseBody>(responseStream, responseHeaders,
                HttpStatus.PARTIAL_CONTENT);
    }

    private String getFilename(String ogFilename, String displayName) {
        if (displayName != null)
            return displayName;
        if (ogFilename != null) {
            return ogFilename.substring(0, ogFilename.lastIndexOf("."));
        }
        return "Unnamed File";
    }

    public Media store(MultipartFile file, FileUploadRequest uploadedMetadata) {
        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file.");
            }

            String[] ext = MimeTypes.findExtensionsByMimeTypes(file.getContentType(), false);

            String displayName =
                    getFilename(file.getOriginalFilename(), uploadedMetadata.getName());
            String thumbnail =
                    uploadedMetadata.getThumbnail() != null ? uploadedMetadata.getThumbnail() : "";
            String filename = uploadedMetadata.getUuid().toString() + "." + ext[0];
            Path destinationFile = this.rootLocation.resolve(filename).normalize().toAbsolutePath();

            if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
                throw new StorageException("Cannont store file outside current directory.");
            }

            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
            }

            Media media = Media.builder().uuid(uploadedMetadata.getUuid()).name(displayName)
                    .contentPath("/api/file/" + filename)
                    .releaseYear(uploadedMetadata.getReleaseYear())
                    .mediaType(uploadedMetadata.getType()).contentType(file.getContentType())
                    .thumbnail(thumbnail).fallbackColor("#ffffff")
                    .rating(uploadedMetadata.getRating()).size(file.getSize()).build();

            return media;
        } catch (IOException e) {
            throw new StorageException("Failed to store file.", e);
        }
    }

    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.rootLocation, 1).filter(path -> !path.equals(this.rootLocation))
                    .map(this.rootLocation::relativize);
        } catch (IOException e) {
            throw new StorageException("Failed to read stored files", e);
        }
    }

    public Path load(String filename) {
        return rootLocation.resolve(filename);
    }

    public URI getFileUri(String filename) {
        Path file = load(filename);
        URI fileUri = file.toUri();
        return fileUri;
    }

    public Resource loadAsResource(String filename) {
        try {
            URI fileUri = getFileUri(filename);

            if (fileUri == null) {
                throw new MalformedURLException();
            }

            Resource resource = new UrlResource(fileUri);
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new StorageFileNotFoundException("Cound not read file: " + filename);
            }
        } catch (MalformedURLException e) {
            throw new StorageFileNotFoundException("Could not read file: " + filename, e);
        }
    }

    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    public void init() {
        try {
            if (!Files.exists(rootLocation)) {
                Files.createDirectories(rootLocation);
            }
        } catch (IOException e) {
            throw new StorageException("Could not initialize storage", e);
        }
    }

    public void delete(String filename) {
        Path file = load(filename);
        FileSystemUtils.deleteRecursively(file.toFile());
    }
}
