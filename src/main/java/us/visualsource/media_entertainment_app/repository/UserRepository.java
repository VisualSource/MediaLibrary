package us.visualsource.media_entertainment_app.repository;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import us.visualsource.media_entertainment_app.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByJwtId(UUID id);

    Optional<User> findByEmail(String email);

    Boolean existsByJwtId(UUID id);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
