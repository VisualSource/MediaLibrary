package us.visualsource.media_entertainment_app.dto.response;

import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ErrorResponse {
    private String message;

    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss a")
    @Builder.Default
    Date timestamp = new Date();

    private Integer status;

    private String path;
}
