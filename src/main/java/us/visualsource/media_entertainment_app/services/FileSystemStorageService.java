package us.visualsource.media_entertainment_app.services;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.stream.Stream;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import us.visualsource.media_entertainment_app.util.*;

@Service
public class FileSystemStorageService {
    private final Path rootLocation;


    public FileSystemStorageService() {
        this.rootLocation = Paths.get("upload-dir");
        init();
    }


    public void store(MultipartFile file) {
        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file.");
            }
            Path destinationFile = this.rootLocation.resolve(file.getOriginalFilename()).normalize()
                    .toAbsolutePath();

            if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
                throw new StorageException("Cannont store file outside current directory.");
            }

            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
            }

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
