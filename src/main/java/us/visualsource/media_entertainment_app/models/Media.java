package us.visualsource.media_entertainment_app.models;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import org.springframework.http.MediaType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;


@Entity
@Table(name = "media")
@NoArgsConstructor
public class Media {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Getter
    private UUID uuid;

    @Getter
    @NotBlank(message = "A name is required")
    @NotNull
    @Setter
    private String name;

    @Getter
    @Setter
    private Long releaseYear;

    @Getter
    @Setter
    private String mediaType;

    @Getter
    @Setter
    private String contentType = MediaType.APPLICATION_OCTET_STREAM.getType();

    @Getter
    @Setter
    private String rating;

    @Getter
    @Setter
    private String thumbnail;

    @Getter
    @Setter
    @Pattern(regexp = "^#([0-9a-fA-F]){6}", message = "Must be a color value in hex")
    private String fallbackColor = "#ffffff";

    @Getter
    @Setter
    @NotBlank(message = "A content path is required.")
    private String contentPath;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true,
            mappedBy = "media")
    @Getter
    @Setter
    private Set<Bookmark> bookmarks = new HashSet<>();

    @Getter
    @Setter
    private Boolean isBookmarked = false;

    public Media(String name, Long releaseYear, String mediaType, String rating, String contentType,
            String thumbnail, String fallbackColor, String contentPath) {
        this.name = name;
        this.releaseYear = releaseYear;
        this.mediaType = mediaType;
        this.rating = rating;
        this.contentType = contentType;
        this.contentPath = contentPath;
        this.thumbnail = thumbnail;
        this.fallbackColor = fallbackColor;
    }
}
