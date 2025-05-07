package com.my.pivoteer.api.help.model.dto

import java.util.*

data class HelpTopicDto(
    val id: UUID,
    val title: String,
    val description: String,
    val createdDate: Date,
    val attachments: List<AttachmentDto>
)

data class AttachmentDto(
    val index: Int,
    val fileUrl: String
)
