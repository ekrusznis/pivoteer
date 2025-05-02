package com.my.pivoteer.api.logs.model.dto

import java.time.LocalDateTime
import java.util.*

data class RequestLogDto(
    val id: UUID,
    val requestType: String,
    val message: String,
    val success: Boolean,
    val timestamp: LocalDateTime,
    val fileName: String?
)
