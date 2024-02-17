package us.visualsource.media_entertainment_app.services.impl;

import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import us.visualsource.media_entertainment_app.models.User;
import us.visualsource.media_entertainment_app.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Transactional
    public UserDetails loadUserByJwtID(UUID id) throws UsernameNotFoundException {
        User user = userRepository.findByJwtId(id)
                .orElseThrow(() -> new UsernameNotFoundException("User was not found"));
        return UserDetailsImpl.build(user);
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User was not found"));
        return UserDetailsImpl.build(user);
    }
}
