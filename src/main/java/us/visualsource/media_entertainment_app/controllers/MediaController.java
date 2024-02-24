package us.visualsource.media_entertainment_app.controllers;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import us.visualsource.media_entertainment_app.models.Media;
import us.visualsource.media_entertainment_app.repository.MediaRepository;
import us.visualsource.media_entertainment_app.services.JwtService;
import us.visualsource.media_entertainment_app.services.impl.UserDetailsImpl;

@RestController
@RequestMapping("/api/media")
public class MediaController {

    @Autowired
    JwtService jwtService;

    @Autowired
    MediaRepository mediaRepository;

    private UserDetailsImpl getUser() {
        return (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
    }

    @GetMapping
    public ResponseEntity<?> GetMedia(@RequestParam("type") Optional<String> type,
            @RequestParam("bookmarked") Optional<Boolean> bookmarked) {
        if (type.isPresent() && bookmarked.isPresent()) {
            UserDetailsImpl user = getUser();

            List<Media> results =
                    mediaRepository.findAllByBookmarkAndType(user.getId(), type.get());
            return ResponseEntity.ok(results);
        }

        if (type.isPresent() && bookmarked.isEmpty()) {
            List<Media> results = mediaRepository.findAllByType(type.get());
            return ResponseEntity.ok(results);
        }

        if (type.isEmpty() && bookmarked.isPresent()) {
            UserDetailsImpl user = getUser();
            List<Media> results = mediaRepository.findAllByBookmark(user.getId());
            return ResponseEntity.ok(results);
        }

        List<Media> results = mediaRepository.findAll();
        return ResponseEntity.ok(results);
    }

    @GetMapping("/watched")
    public ResponseEntity<?> GetWatchedLast() {
        return ResponseEntity.ok(mediaRepository.selectFirst(10));
    }

    @GetMapping("/recommeded")
    public ResponseEntity<?> GetRecommeded() {
        return ResponseEntity.ok(mediaRepository.findAll());
    }
}
