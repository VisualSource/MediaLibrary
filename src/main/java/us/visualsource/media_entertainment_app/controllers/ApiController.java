package us.visualsource.media_entertainment_app.controllers;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import us.visualsource.media_entertainment_app.dto.request.BookmarkRequest;
import us.visualsource.media_entertainment_app.dto.response.BookmarkResponse;
import us.visualsource.media_entertainment_app.dto.response.Error;
import us.visualsource.media_entertainment_app.dto.response.ErrorResponse;
import us.visualsource.media_entertainment_app.dto.response.UserResponse;
import us.visualsource.media_entertainment_app.models.Bookmark;
import us.visualsource.media_entertainment_app.models.Media;
import us.visualsource.media_entertainment_app.models.User;
import us.visualsource.media_entertainment_app.repository.*;
import us.visualsource.media_entertainment_app.services.JwtService;
import us.visualsource.media_entertainment_app.services.impl.UserDetailsImpl;

@RestController
@RequestMapping("/api")
public class ApiController {
    @Autowired
    JwtService jwtService;
    @Autowired
    UserRepository userRepository;

    @Autowired
    MediaRepository mediaRepository;

    @Autowired
    BookmarkRepository bookmarkRepository;

    private final Logger logger = LoggerFactory.getLogger(ApiController.class);

    private UserDetailsImpl getUser() {
        return (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
    }

    private ResponseEntity<?> badRequest(String title, String detail, String instance,
            String type) {
        ErrorResponse response = ErrorResponse.builder().status(HttpStatus.BAD_REQUEST.value())
                .errors(Arrays.asList(new Error(title, detail, instance, type))).build();

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    private List<Media> searchMedia(String query, Optional<Boolean> bookmarked,
            Optional<String> type) {
        if (bookmarked.isPresent()) {
            UserDetailsImpl user = getUser();

            if (type.isPresent()) {
                return mediaRepository.searchBy(query, user.getId(), type.get());
            }

            return mediaRepository.searchBy(query, user.getId());
        }

        if (type.isPresent()) {
            return mediaRepository.searchBy(query, type.get());
        }

        return mediaRepository.serachBy(query);
    }


    @GetMapping("/search")
    public ResponseEntity<?> Search(@RequestParam("q") String query,
            @RequestParam("bookmarked") Optional<Boolean> bookmarked,
            @RequestParam("type") Optional<String> type) {

        logger.info("Query: {}", query);
        logger.info("Is Bookmarked {}", bookmarked);

        List<Media> results = searchMedia(query, bookmarked, type);

        return ResponseEntity.ok(results);
    }

    @PatchMapping("/bookmark")
    public ResponseEntity<?> bookmark(@Valid @RequestBody BookmarkRequest request) {
        UserDetailsImpl userDetails = getUser();
        UUID itemId = request.getItem();
        Long userId = userDetails.getId();

        if (itemId == null || userId == null) {
            return badRequest("Invaild params", "item or user id is null", "", "/error/null-param");
        }

        Optional<Bookmark> bookmark = bookmarkRepository.findByMediaAndOwner(itemId, userId);

        if (bookmark.isEmpty()) {
            Optional<User> user = userRepository.findById(userId);
            Optional<Media> media = mediaRepository.findById(itemId);

            if (user.isEmpty() || media.isEmpty()) {
                return badRequest("Not Found", "the user or the media can not be found", "",
                        "/error/not-found");
            }

            Bookmark item = bookmarkRepository.save(new Bookmark(user.get(), media.get()));;

            return ResponseEntity.ok(new BookmarkResponse(true, item.getId()));
        }

        Bookmark result = bookmark.get();

        if (result == null) {
            return badRequest("No bookmark found", "Given bookmark id could not be found", "",
                    "/error/not-found");
        }

        bookmarkRepository.delete(result);

        return ResponseEntity.ok(new BookmarkResponse(false, null));
    }

    @GetMapping(value = "/user", produces = MediaType.APPLICATION_JSON_VALUE)
    public UserResponse GetUser() {
        UserDetailsImpl userDetails = getUser();

        List<String> roles = userDetails.getAuthorities().stream().map(e -> e.getAuthority())
                .collect(Collectors.toList());

        return UserResponse.builder().email(userDetails.getEmail())
                .username(userDetails.getUsername()).id(userDetails.getId())
                .jwtId(userDetails.getJwtId()).avatar(userDetails.getAvatar()).roles(roles).build();
    }

}
