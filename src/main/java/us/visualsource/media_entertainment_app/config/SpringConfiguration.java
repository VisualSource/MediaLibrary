package us.visualsource.media_entertainment_app.config;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;
import org.springframework.web.servlet.resource.ResourceResolverChain;

@Configuration
public class SpringConfiguration implements WebMvcConfigurer {
    // handle routing
    @Override
    public void addResourceHandlers(@NonNull ResourceHandlerRegistry registry) {
        /*(if (environment.acceptsProfiles(Profiles.of("dev"))) {
            this.serveDirectory(registry, "/dev-dashboard", "classpath:/dev_assets/");
        }*/
        this.serveDirectory(registry, "/", "classpath:/static/");
    }

    // handle cors for api route
    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOriginPatterns("*");
    }
    // handle serving react spa
    private void serveDirectory(ResourceHandlerRegistry registry, @NonNull String endpoint, @NonNull String location) {
        String[] endpointPatterns = endpoint.endsWith("/")
                ? new String[]{endpoint.substring(0, endpoint.length() - 1), endpoint, endpoint + "**"}
                : new String[]{endpoint, endpoint + "/", endpoint + "/**"};
        registry
                .addResourceHandler(endpointPatterns)
                .addResourceLocations(location.endsWith("/") ? location : location + "/")
                .resourceChain(false)
                .addResolver(new PathResourceResolver() {
                    @Override
                    public Resource resolveResource(@Nullable HttpServletRequest request, @NonNull String requestPath, @NonNull List<? extends Resource> locations, @NonNull ResourceResolverChain chain) {
                        Resource resource = super.resolveResource(request, requestPath, locations, chain);
                        if (resource != null) {
                            return resource;
                        }
                        return super.resolveResource(request, "/index.html", locations, chain);
                    }
                });
    }
    
}