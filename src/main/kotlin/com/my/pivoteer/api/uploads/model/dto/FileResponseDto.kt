package com.my.pivoteer.api.uploads.model.dto

import java.util.*

data class FileResponseDto(
    val id: UUID,
    val fileName: String,
    val fileType: String,
    val base64Data: String
) {
}