package us.visualsource.media_entertainment_app.dto.request;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatchUserRequest {

    @Nullable
    @Email
    private String email;

    @Nullable
    private String username;

    @Nullable
    private String avatar;
}
