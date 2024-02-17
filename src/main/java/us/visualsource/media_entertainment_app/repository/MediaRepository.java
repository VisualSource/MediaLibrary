package us.visualsource.media_entertainment_app.repository;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import us.visualsource.media_entertainment_app.models.Media;

public interface MediaRepository extends JpaRepository<Media, UUID> {

        @Query(value = "SELECT * FROM media WHERE name LIKE %:name%", nativeQuery = true)
        List<Media> serachBy(@Param("name") String name);

        @Query(value = "SELECT * FROM media WHERE media_type = :type AND name LIKE %:query%",
                        nativeQuery = true)
        List<Media> searchBy(@Param("query") String query, @Param("type") String type);

        @Query(value = "SELECT * FROM media m JOIN bookmarks b ON m.uuid = b.media_id WHERE b.owner_id = :owner AND m.name LIKE %:query%",
                        nativeQuery = true)
        List<Media> searchBookmarkedBy(@Param("query") String query, @Param("owner") Long owner);

        @Query(value = "SELECT * FROM media m JOIN bookmarks b on m.uuid = b.media_id WHERE b.owner_id = :owner AND m.name LIKE %:query% AND m.media_type = :type",
                        nativeQuery = true, name = "SearchOwnerQueryType")
        List<Media> searchBookmarkedBy(@Param("query") String query, @Param("owner") Long owner,
                        @Param("type") String type);


        @Query(value = "SELECT * FROM media WHERE media_type = :type", nativeQuery = true)
        List<Media> findAllByType(@Param("type") String media_type);

        @Query(value = "SELECT * FROM media m JOIN bookmarks b ON m.uuid = b.media_id WHERE b.owner_id = :owner AND m.media_type = :type",
                        nativeQuery = true)
        List<Media> findAllByBookmarkAndType(@Param("owner") Long user_id,
                        @Param("type") String media_type);

        @Query(value = "SELECT * FROM media m JOIN bookmarks b ON m.uuid = b.media_id WHERE b.owner_id = :owner",
                        nativeQuery = true)
        List<Media> findAllByBookmark(@Param("owner") Long user_id);

        @Query(value = "SELECT * FROM media LIMIT :count", nativeQuery = true)
        List<Media> selectFirst(@Param("count") Integer count);
}
