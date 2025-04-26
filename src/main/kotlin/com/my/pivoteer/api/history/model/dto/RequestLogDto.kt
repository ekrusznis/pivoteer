package com.my.pivoteer.api.history.model.dto

import com.my.pivoteer.api.history.enum.RequestType
import java.time.LocalDateTime
import java.util.*

data class RequestLogDto(
    val id: UUID,
    val timestamp: LocalDateTime,
    val userId: UUID,
    val fileId: UUID?,
    val requestType: RequestType,
    val success: Boolean,
    val message: String
)
