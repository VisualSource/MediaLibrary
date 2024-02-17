package us.visualsource.media_entertainment_app.dto.request;

import java.util.UUID;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookmarkRequest {
    @NotNull
    private UUID item;
}
