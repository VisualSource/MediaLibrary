package us.visualsource.media_entertainment_app.dto.response;

import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class BookmarkResponse {
    private boolean state;
    @Nullable
    private Long id;
}
