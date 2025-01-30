package com.my.pivoteer.api.utils.swagger

import io.swagger.v3.oas.annotations.OpenAPIDefinition
import io.swagger.v3.oas.annotations.info.Info
import org.springframework.context.annotation.Configuration

@OpenAPIDefinition(
    info = Info(title = "Pivoteer API", version = "1.0", description = "API Documentation")
)
@Configuration
class SwaggerConfig
