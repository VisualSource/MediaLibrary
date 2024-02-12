package us.visualsource.media_entertainment_app;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api")
public class ApiController {
 
    @GetMapping("ping")
    public String ping() {
        return "pong";
    }
 
}