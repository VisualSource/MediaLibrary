package us.visualsource.media_entertainment_app.controllers;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import us.visualsource.media_entertainment_app.dto.response.UserResponse;
import us.visualsource.media_entertainment_app.models.User;
import us.visualsource.media_entertainment_app.repository.UserRepository;
import us.visualsource.media_entertainment_app.services.JwtService;
import us.visualsource.media_entertainment_app.services.impl.UserDetailsImpl;

@RestController
@RequestMapping("api")
public class ApiController {
    @Autowired
    JwtService jwtService;
    @Autowired
    UserRepository userRepository;


    @GetMapping("/serach")
    @PreAuthorize("hasRole('ROLE_USER')")
    public String search() {
        return "";
    }

    @PatchMapping("/bookmark")
    @PreAuthorize("hasRole('ROLE_USER')")
    public String bookmark() {
        return "";
    }

    @GetMapping(value = "/user", produces = MediaType.APPLICATION_JSON_VALUE)
    public UserResponse GetUser() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        List<String> roles = userDetails.getAuthorities().stream().map(e -> e.getAuthority())
                .collect(Collectors.toList());

        return UserResponse.builder().email(userDetails.getEmail())
                .username(userDetails.getUsername()).id(userDetails.getId()).avatar("").roles(roles)
                .build();
    }
}
