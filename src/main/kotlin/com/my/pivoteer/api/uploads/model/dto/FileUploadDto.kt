package com.my.pivoteer.api.uploads.model.dto

import java.time.LocalDateTime
import java.util.*

data class FileUploadDto(
    val id: UUID,
    val userId: UUID,
    val filename: String,
    val fileType: String,
    val fileSize: Long,
    val uploadedAt: LocalDateTime
    )
