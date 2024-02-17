package us.visualsource.media_entertainment_app.dto.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class ErrorResponse {
    /** the HTTP response code (optional) */
    private Integer status;
    /** a list of errors */
    private List<Error> errors;
}
