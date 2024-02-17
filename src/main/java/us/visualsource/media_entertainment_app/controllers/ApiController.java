package us.visualsource.media_entertainment_app.controllers;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import us.visualsource.media_entertainment_app.dto.response.UserResponse;
import us.visualsource.media_entertainment_app.models.Media;
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

    private List<Media> searchMedia(String query, Optional<Boolean> bookmarked,
            Optional<String> type) {
        if (bookmarked.isPresent()) {
            UserDetailsImpl user = getUser();

            if (type.isPresent()) {
                return mediaRepository.searchBookmarkedBy(query, user.getId(), type.get());
            }

            return mediaRepository.searchBookmarkedBy(query, user.getId());
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
        logger.info("Type: {}", type);

        List<Media> results = searchMedia(query, bookmarked, type);

        return ResponseEntity.ok(results);
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
