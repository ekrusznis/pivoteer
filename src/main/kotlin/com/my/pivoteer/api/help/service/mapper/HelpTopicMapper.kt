package com.my.pivoteer.api.help.service.mapper

import com.my.pivoteer.api.help.model.Attachment
import com.my.pivoteer.api.help.model.HelpTopic
import com.my.pivoteer.api.help.model.dto.AttachmentDto
import com.my.pivoteer.api.help.model.dto.HelpTopicDto

object HelpTopicMapper {
    fun toDto(entity: HelpTopic): HelpTopicDto =
        HelpTopicDto(
            id = entity.id,
            title = entity.title,
            description = entity.description,
            createdDate = entity.createdDate,
            attachments = entity.attachments.map { AttachmentDto(it.index, it.fileUrl) }
        )

    fun toEntity(dto: HelpTopicDto): HelpTopic =
        HelpTopic(
            id = dto.id,
            title = dto.title,
            description = dto.description,
            createdDate = dto.createdDate,
            attachments = dto.attachments.map { Attachment(it.index, it.fileUrl) }
        )
}
