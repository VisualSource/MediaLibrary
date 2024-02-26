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
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Media {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;

    private Long size;

    @NotBlank(message = "A name is required")
    @NotNull
    private String name;
    private Long releaseYear;
    private String mediaType;
    @Builder.Default
    private String contentType = MediaType.APPLICATION_OCTET_STREAM.getType();
    private String rating;
    private String thumbnail;

    @Pattern(regexp = "^#([0-9a-fA-F]){6}", message = "Must be a color value in hex")
    @Builder.Default
    private String fallbackColor = "#ffffff";

    @NotBlank(message = "A content path is required.")
    private String contentPath;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true,
            mappedBy = "media")
    @JsonIgnore
    @Builder.Default
    private Set<Bookmark> bookmarks = new HashSet<>();
}
