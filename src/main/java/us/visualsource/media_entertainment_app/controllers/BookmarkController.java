package us.visualsource.media_entertainment_app.controllers;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;
import us.visualsource.media_entertainment_app.dto.request.BookmarkRequest;
import us.visualsource.media_entertainment_app.dto.response.BookmarkResponse;
import us.visualsource.media_entertainment_app.models.Bookmark;
import us.visualsource.media_entertainment_app.models.Media;
import us.visualsource.media_entertainment_app.models.User;
import us.visualsource.media_entertainment_app.repository.BookmarkRepository;
import us.visualsource.media_entertainment_app.repository.MediaRepository;
import us.visualsource.media_entertainment_app.repository.UserRepository;
import us.visualsource.media_entertainment_app.services.impl.UserDetailsImpl;
import us.visualsource.media_entertainment_app.util.NotFoundException;

@RestController
@RequestMapping("/api")
public class BookmarkController {
    @Autowired
    BookmarkRepository bookmarkRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    MediaRepository mediaRepository;

    @GetMapping("/bookmarks")
    public ResponseEntity<?> GetUserBookmarks() {
        UserDetailsImpl userDetails = getUser();

        List<Bookmark> bookmarks = bookmarkRepository.findAllByOwnerId(userDetails.getId());

        return ResponseEntity.ok(bookmarks);
    }

    @PutMapping("/bookmark")
    public ResponseEntity<?> bookmark(@Valid @RequestBody BookmarkRequest request)
            throws NotFoundException, BadRequestException {
        UserDetailsImpl userDetails = getUser();
        UUID itemId = request.getItem();
        Long userId = userDetails.getId();

        if (itemId == null || userId == null) {
            throw new BadRequestException("bookmark uuid or user id is not set.");
        }

        Optional<Bookmark> bookmark = bookmarkRepository.findByMediaAndOwner(itemId, userId);

        if (bookmark.isEmpty()) {
            Optional<User> user = userRepository.findById(userId);
            Optional<Media> media = mediaRepository.findById(itemId);

            if (user.isEmpty() || media.isEmpty()) {
                throw new NotFoundException("Failed to find ethier meida or user.");
            }

            Bookmark item = bookmarkRepository.save(new Bookmark(user.get(), media.get()));;

            return ResponseEntity.ok(new BookmarkResponse(true, item.getId()));
        }

        Bookmark result = bookmark.get();

        if (result == null) {
            throw new NotFoundException("Failed to find bookmark with given id.");
        }

        bookmarkRepository.delete(result);

        return ResponseEntity.ok(new BookmarkResponse(false, null));
    }

    private UserDetailsImpl getUser() {
        return (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
    }
}
