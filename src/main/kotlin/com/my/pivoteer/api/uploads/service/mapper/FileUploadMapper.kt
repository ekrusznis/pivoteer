package com.my.pivoteer.api.uploads.service.mapper

import com.my.pivoteer.api.uploads.model.FileUpload
import com.my.pivoteer.api.uploads.model.dto.FileUploadDto
import com.my.pivoteer.api.user.model.User

object FileUploadMapper {
    fun toDTO(fileUpload: FileUpload) = FileUploadDto(
        id = fileUpload.id,
        userId = fileUpload.user.id,
        filename = fileUpload.filename,
        fileType = fileUpload.fileType,
        fileSize = fileUpload.fileSize,
        uploadedAt = fileUpload.uploadedAt
    )

    fun toEntity(dto: FileUploadDto, user: User) = FileUpload(
        user = user,
        filename = dto.filename,
        fileType = dto.fileType,
        fileSize = dto.fileSize,
        fileData = ByteArray(0),
        uploadedAt = dto.uploadedAt
    )
}
