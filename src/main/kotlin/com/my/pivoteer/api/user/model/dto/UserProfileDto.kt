package com.my.pivoteer.api.user.model.dto

import java.util.*

data class UserProfileDto(
    val userId: UUID,
    val email: String,
    val createdAt: String?,
    val updatedAt: String?,

    // ✅ Subscription Details
    val subscriptionPlanId: String? = null,
    val subscriptionStatus: String,
    val subscriptionExpiry: String? = null,

    // ✅ Usage & Activity
    val totalFilesUploaded: Int,
    val lastFileUploadDate: String? = null,

    // ✅ Security Information
    val hasTwoFactorAuth: Boolean
)

