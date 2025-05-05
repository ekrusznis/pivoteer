package com.my.pivoteer.api.user.model.dto

import com.my.pivoteer.api.user.enum.SubscriptionStatus
import java.util.*

data class UserDto(
    val id: UUID? = null,
    val firstName: String,
    val lastName: String,
    val birthDate: Date,
    val email: String,
    val subscriptionId: String? = null,
    val createdDate: Date? = null,
    val updatedDate: Date? = null,
    val subscriptionExpiry: Date? = null,
    val subscriptionStatus: SubscriptionStatus? = null
)