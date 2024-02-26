package us.visualsource.media_entertainment_app;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import us.visualsource.media_entertainment_app.services.FileSystemStorageService;
import us.visualsource.media_entertainment_app.util.StorageFileNotFoundException;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import java.nio.file.Paths;
import java.util.stream.Stream;

@AutoConfigureMockMvc
@SpringBootTest
public class FileUploadTests {

        @Autowired
        private MockMvc mvc;

        @Autowired
        private FileSystemStorageService storageService;

}
