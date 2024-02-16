package us.visualsource.media_entertainment_app.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/media")
public class MediaFileController {

    @GetMapping("/{uuid}")
    public ResponseEntity<?> GetFileMetadata() {
        return ResponseEntity.ok(null);
    }

    @GetMapping("/{uuid}/download")
    public ResponseEntity<?> GetFileDownload() {
        return ResponseEntity.ok(null);
    }

    @GetMapping("/{uuid}")
    public ResponseEntity<?> PatchFileMetadata() {
        return ResponseEntity.ok(null);
    }

    @GetMapping("/{uuid}")
    public ResponseEntity<?> DeleteFile() {
        return ResponseEntity.ok(null);
    }

}
