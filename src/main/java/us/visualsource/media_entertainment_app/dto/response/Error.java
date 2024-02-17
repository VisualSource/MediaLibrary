package us.visualsource.media_entertainment_app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/** IETF devised RFC 7807, which creates a generalized error-handling schema. */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Error {
    /** a brief, human-readable message about the error */
    private String title;
    /** a human-readable explanation of the error */
    private String detail;
    /** a URI that identifies the specific occurrence of the error */
    private String instance;
    /** a URI identifier that categorizes the error */
    private String type;
}
