package com.my.pivoteer.api.support.model.dto

import java.util.*

data class CreateSupportTicketRequestDto(
    val userId: UUID,
    val logId: UUID?,
    val title: String,
    val message: String,
    val userEmail: String
)
