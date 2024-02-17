package us.visualsource.media_entertainment_app.services;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import javax.crypto.SecretKey;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import us.visualsource.media_entertainment_app.services.impl.UserDetailsImpl;

@Component
public class JwtService {
    public static final String SECRET =
            "357638792F423F4428472B4B6250655368566D597133743677397A2443264629";
    private final Integer TOKEN_LIFE_TIME = 1000 * 60 * 25;

    public String extractSubject(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public UUID extractSubjectAsUUID(String token) {
        return UUID.fromString(extractSubject(token));
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().verifyWith((SecretKey) getSignKey()).build().parseSignedClaims(token)
                .getPayload();
    }

    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);

        return Keys.hmacShaKeyFor(keyBytes);
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Boolean validateToken(String token, UserDetailsImpl userDetails) {
        final UUID uuid = extractSubjectAsUUID(token);
        return (uuid.equals(userDetails.getJwtId()) && !isTokenExpired(token));
    }


    public String GenerateToken(UUID id) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, id.toString());
    }

    public String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder().claims(claims).subject(subject)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + TOKEN_LIFE_TIME))
                .signWith(getSignKey()).compact();
    }
}
