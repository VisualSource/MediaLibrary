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
import jakarta.validation.Valid;
import us.visualsource.media_entertainment_app.dto.response.UserResponse;
import us.visualsource.media_entertainment_app.dto.request.PatchUserRequest;
import us.visualsource.media_entertainment_app.models.Media;
import us.visualsource.media_entertainment_app.models.User;
import us.visualsource.media_entertainment_app.repository.*;
import us.visualsource.media_entertainment_app.services.JwtService;
import us.visualsource.media_entertainment_app.services.impl.UserDetailsImpl;
import us.visualsource.media_entertainment_app.util.NotFoundException;

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

    @PatchMapping(value = "/user", produces = MediaType.APPLICATION_JSON_VALUE)
    public UserResponse PatchUser(@Valid @RequestBody PatchUserRequest request)
            throws NotFoundException {
        UserDetailsImpl userDetails = getUser();

        Long id = userDetails.getId();
        if (id == null)
            throw new NotFoundException("User not found");

        Optional<User> user = userRepository.findById(id);

        User userData = user.orElseThrow(() -> new NotFoundException("User was not found"));
        if (userData == null)
            throw new NotFoundException("User was not found");

        String updateEmail = request.getEmail();

        if (updateEmail != null) {
            userData.setEmail(updateEmail);
        }

        String username = request.getUsername();

        if (username != null) {
            userData.setUsername(username);
        }

        String avatar = request.getAvatar();

        if (avatar != null) {
            userData.setAvatar(avatar);
        }

        userRepository.save(userData);

        List<String> roles = userDetails.getAuthorities().stream().map(e -> e.getAuthority())
                .collect(Collectors.toList());
        return UserResponse.builder().email(userData.getEmail()).username(userData.getUsername())
                .id(userData.getId()).jwtId(userData.getJwtId()).avatar(userData.getAvatar())
                .roles(roles).build();
    }

}
