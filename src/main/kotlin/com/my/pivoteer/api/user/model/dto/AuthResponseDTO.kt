package com.my.pivoteer.api.user.model.dto

import java.util.*

data class AuthResponseDTO(
    val token: String?,
    val userId: UUID
)
