package com.my.pivoteer.api.user.service.mapper

import com.my.pivoteer.api.user.model.User
import com.my.pivoteer.api.user.model.dto.UserDto
import com.my.pivoteer.api.user.model.dto.UserProfileDto
import com.my.pivoteer.api.uploads.model.dto.FileUploadDto
import java.text.SimpleDateFormat
import java.util.*

object UserMapper {

    // ✅ Date formatter (Handles MM/dd/yyyy HH:mm a z format)
    private val dateFormatter = SimpleDateFormat("MM/dd/yyyy hh:mm a z")

    // ✅ Convert `User` to `UserDto`
    fun toDTO(user: User) = UserDto(
        id = user.id,
        email = user.email,
        subscriptionId = user.subscriptionId,
        subscriptionStatus = user.subscriptionStatus,
        createdDate = user.createdAt,  // ✅ Keep as Date
        updatedDate = user.updatedAt,  // ✅ Keep as Date
        subscriptionExpiry = user.subscriptionExpiry
    )

    // ✅ Convert `UserDto` to `User`
    fun toEntity(dto: UserDto) = User(
        email = dto.email,
        password = "",
        subscriptionId = dto.subscriptionId,
        subscriptionStatus = dto.subscriptionStatus,
        subscriptionExpiry = dto.subscriptionExpiry,
        updatedAt = Date() // ✅ Use current timestamp
    )

    // ✅ Convert `User` to `UserProfileDto`
    fun toProfileDTO(user: User, fileUploads: List<FileUploadDto>): UserProfileDto {
        val lastFileUploadDate = fileUploads
            .sortedByDescending { it.uploadedAt }
            .firstOrNull()?.uploadedAt

        return UserProfileDto(
            userId = user.id,
            email = user.email,
            createdAt = formatDate(user.createdAt),
            updatedAt = formatDate(user.updatedAt),
            totalFilesUploaded = fileUploads.size,
            lastFileUploadDate = lastFileUploadDate?.let { formatDate(it) },
            hasTwoFactorAuth = false, // Placeholder
            subscriptionPlanId = user.subscriptionId ?: "",
            subscriptionStatus = user.subscriptionStatus?.name ?: "",
            subscriptionExpiry = user.subscriptionExpiry?.let { formatDate(it) }
        )
    }

    private fun formatDate(date: Date?): String? {
        return date?.let { dateFormatter.format(it) }
    }
}
