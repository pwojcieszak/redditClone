package com.pwojcieszak.redditCloneBackend.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfiguration {
    @Bean
    public OpenAPI expenseAPI() {
        return new OpenAPI()
                .info(new Info().title("Reddit Clone API")
                        .description("API for Reddit Clone Application")
                        .version("v0.0.1")
                        .license(new License().name("Apache License Version 2.0").url("https://github.com/pwojcieszak")))
                .externalDocs(new ExternalDocumentation()
                        .description("Project GitHub Page")
                        .url("https://github.com/pwojcieszak/redditClone"));
    }
}
