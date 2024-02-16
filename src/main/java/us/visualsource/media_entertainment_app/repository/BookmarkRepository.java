package us.visualsource.media_entertainment_app.repository;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import us.visualsource.media_entertainment_app.models.Bookmark;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    @Query(value = "SELECT * FROM bookmarks WHERE media_id = :media AND owner_id = :owner",
            nativeQuery = true)
    Optional<Bookmark> findByMediaAndOwner(@Param("media") UUID media_id,
            @Param("owner") Long owner_id);
}
