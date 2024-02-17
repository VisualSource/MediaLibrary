package us.visualsource.media_entertainment_app.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthRequest {
    @NotBlank
    @Email
    private String email;
    @NotBlank
    private String password;
}
