package us.visualsource.media_entertainment_app.controllers;

import java.util.Arrays;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import io.jsonwebtoken.ExpiredJwtException;
import us.visualsource.media_entertainment_app.dto.response.Error;
import us.visualsource.media_entertainment_app.dto.response.ErrorResponse;
import us.visualsource.media_entertainment_app.util.NotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;

@ControllerAdvice
public class ApiExecptionHandler {
        @ExceptionHandler(ExpiredJwtException.class)
        public ResponseEntity<?> handleExpiredJwtException(ExpiredJwtException ex) {
                Error error = Error.builder().title("Session Expired")
                                .detail(ex.getLocalizedMessage()).type("/error/session-expired")
                                .build();

                ErrorResponse response =
                                ErrorResponse.builder().status(HttpStatus.UNAUTHORIZED.value())
                                                .errors(Arrays.asList(error)).build();

                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<?> handleMethodArgumentNotValidException(
                        MethodArgumentNotValidException ex) {
                Error error = Error.builder().title("Invalid argument")
                                .detail(ex.getLocalizedMessage()).type("/error/invalid-argument")
                                .build();

                ErrorResponse response =
                                ErrorResponse.builder().status(HttpStatus.BAD_REQUEST.value())
                                                .errors(Arrays.asList(error)).build();

                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        @ExceptionHandler(NotFoundException.class)
        public ResponseEntity<?> handleNotFoundException(NotFoundException ex) {
                Error error = Error.builder().title("Not Found").detail(ex.getLocalizedMessage())
                                .type("/error/not found").build();

                ErrorResponse response =
                                ErrorResponse.builder().status(HttpStatus.NOT_FOUND.value())
                                                .errors(Arrays.asList(error)).build();
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
}
