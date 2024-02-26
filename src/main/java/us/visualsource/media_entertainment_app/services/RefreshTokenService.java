package us.visualsource.media_entertainment_app.services;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import io.jsonwebtoken.JwtException;
import us.visualsource.media_entertainment_app.models.RefreshToken;
import us.visualsource.media_entertainment_app.models.User;
import us.visualsource.media_entertainment_app.repository.RefreshTokenRepository;
import us.visualsource.media_entertainment_app.repository.UserRepository;
import us.visualsource.media_entertainment_app.services.impl.UserDetailsImpl;

@Service
public class RefreshTokenService {

    private final long refreshDuration = 172800000;

    @Autowired
    RefreshTokenRepository refreshTokenRepository;

    @Autowired
    UserRepository userRepository;

    public void removeRefreshToken(Long user) {
        Optional<RefreshToken> refreshToken = refreshTokenRepository.findByUserId(user);

        if (refreshToken.isPresent()) {
            RefreshToken token = refreshToken.get();

            if (token != null)
                refreshTokenRepository.delete(token);
        }

    }

    public RefreshToken getRefreshToken(UserDetailsImpl user) {
        Optional<RefreshToken> token = refreshTokenRepository.findByUserId(user.getId());
        if (token.isEmpty()) {
            return createRefreshToken(user.getJwtId());
        }

        RefreshToken rftoken = token.get();

        if (rftoken.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(rftoken);
            return createRefreshToken(user.getJwtId());
        }

        return rftoken;
    }

    public RefreshToken createRefreshToken(UUID userUuid) {
        Optional<User> user = userRepository.findByJwtId(userUuid);
        // set expiry of refresh token to 10 minutes - you can configure it application.properties
        // file
        RefreshToken refreshToken =
                RefreshToken.builder().user(user.get()).token(UUID.randomUUID().toString())
                        .expiryDate(Instant.now().plusMillis(refreshDuration)).build();
        if (refreshToken == null)
            throw new JwtException("Refresh token was invalid");

        return refreshTokenRepository.save(refreshToken);
    }

    public Optional<RefreshToken> findbyToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken verifyRefreshToken(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new JwtException("Refresh token has expired.");
        }
        return token;
    }
}
