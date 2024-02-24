package us.visualsource.media_entertainment_app.dto.request;

import java.util.UUID;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FileUploadRequest {
    private String name;
    private String rating;
    private Long releaseYear;
    private String type;
    private String thumbnail;

    @Builder.Default
    private UUID uuid = UUID.randomUUID();
}
