package us.visualsource.media_entertainment_app.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import us.visualsource.media_entertainment_app.enums.ERole;
import us.visualsource.media_entertainment_app.models.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(ERole name);
}
