package us.visualsource.media_entertainment_app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import us.visualsource.media_entertainment_app.services.JwtService;

@RestController
@RequestMapping("/api/media/{uuid}")
public class MediaFileController {

    @Autowired
    JwtService jwtService;


    @GetMapping("/")
    public ResponseEntity<?> GetFileMetadata() {
        return ResponseEntity.ok(null);
    }

    @GetMapping("/download")
    public ResponseEntity<?> GetFileDownload() {
        return ResponseEntity.ok(null);
    }

    @PatchMapping("/")
    public ResponseEntity<?> PatchFileMetadata() {
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/")
    public ResponseEntity<?> DeleteFile() {
        return ResponseEntity.ok(null);
    }

}
