package com.my.pivoteer.api.support.model.dto

import com.my.pivoteer.api.support.enum.SupportStatus
import java.time.LocalDateTime
import java.util.*

data class SupportTicketDto(
    val id: UUID,
    val createdAt: LocalDateTime,
    val lastUpdated: LocalDateTime?,
    val userId: UUID,
    val logId: UUID?,
    val title: String,
    val message: String,
    val status: SupportStatus
)
