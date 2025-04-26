package com.my.pivoteer.api.email.model

data class EmailRequestDto(
    val to: String,
    val subject: String,
    val templateName: String, // e.g., "registration", "reset-password"
    val templateModel: Map<String, Any> // Variables to replace inside the template
)
