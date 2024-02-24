package us.visualsource.media_entertainment_app.util;

public class StorageException extends RuntimeException {
    public StorageException(String message) {
        super(message);
    }

    public StorageException(String message, Throwable ex) {
        super(message, ex);
    }
}
