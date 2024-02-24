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

        @Test
        public void shouldListAllFiles() throws Exception {
                given(this.storageService.loadAll()).willReturn(
                                Stream.of(Paths.get("first.txt"), Paths.get("second.txt")));

                this.mvc.perform(get("/")).andExpect(status().isOk())
                                .andExpect(model().attribute("files", Matchers.contains(
                                                "http://localhost/files/first.txt",
                                                "http://localhost/files/second.txt")));
        }

        @Test
        public void shouldSaveUploadedFile() throws Exception {
                MockMultipartFile multipartFile = new MockMultipartFile("file", "test.txt",
                                "text/plain", "Spring Framework".getBytes());

                this.mvc.perform(multipart("/").file(multipartFile)).andExpect(status().isFound())
                                .andExpect(header().string("Location", "/"));

                then(this.storageService).should().store(multipartFile);
        }


        public void should404WhenMissingFile() throws Exception {
                given(this.storageService.loadAsResource("test.txt"))
                                .willThrow(StorageFileNotFoundException.class);

                this.mvc.perform(get("/files/test.text")).andExpect(status().isNotFound());
        }
}
