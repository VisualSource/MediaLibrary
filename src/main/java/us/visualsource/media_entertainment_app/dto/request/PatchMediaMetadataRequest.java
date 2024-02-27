package us.visualsource.media_entertainment_app.dto.request;

import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatchMediaMetadataRequest {
    @Nullable
    private String name;
    @Nullable
    private String thumbnail;
    @Nullable
    private Long releaseYear;
    @Nullable
    private String rating;
}
