package us.visualsource.media_entertainment_app.controllers;

import java.security.InvalidParameterException;
import java.util.HashSet;
import java.util.Set;
import javax.management.InvalidAttributeValueException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import us.visualsource.media_entertainment_app.dto.request.AuthRequest;
import us.visualsource.media_entertainment_app.dto.request.SignupRequest;
import us.visualsource.media_entertainment_app.dto.response.JwtResponse;
import us.visualsource.media_entertainment_app.enums.ERole;
import us.visualsource.media_entertainment_app.models.User;
import us.visualsource.media_entertainment_app.models.Role;
import us.visualsource.media_entertainment_app.repository.RoleRepository;
import us.visualsource.media_entertainment_app.repository.UserRepository;
import us.visualsource.media_entertainment_app.services.JwtService;
import us.visualsource.media_entertainment_app.services.impl.UserDetailsImpl;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtService jwtService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder encoder;

    @PostMapping("/login")
    public JwtResponse AuthenticateAndGetToken(@Valid @RequestBody AuthRequest authRequest)
            throws UsernameNotFoundException {

    

        Authentication authentication =
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                        authRequest.getEmail(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {

            UserDetailsImpl user = (UserDetailsImpl) authentication.getPrincipal();

            return JwtResponse.builder().accessToken(jwtService.GenerateToken(user.getJwtId()))
                    .build();
        }

        throw new UsernameNotFoundException("invaild user request.");
    }

    @PostMapping("/signup")
    public JwtResponse CreateAndGetToken(@Valid @RequestBody SignupRequest signupRequest)
            throws InvalidAttributeValueException {

        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new InvalidParameterException();
        }

        User user = new User(signupRequest.getUsername(), signupRequest.getEmail(),
                encoder.encode(signupRequest.getPassword()));

        user.GenerateAvatar();
        Set<Role> roles = new HashSet<>();

        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Failed to load role."));
        roles.add(userRole);
        user.setRoles(roles);

        userRepository.save(user);

        return JwtResponse.builder().accessToken(jwtService.GenerateToken(user.getJwtId())).build();
    }

}
