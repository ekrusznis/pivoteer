package com.my.pivoteer.api.uploads.model.dto

import java.util.*

data class ShareSettingsDto(
    val fileId: UUID,
    val allowPin: Boolean = false,
    val pinCode: String? = null,
    val expiresInDays: Int? = null
)