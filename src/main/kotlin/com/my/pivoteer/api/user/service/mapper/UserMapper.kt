package com.my.pivoteer.api.user.service.mapper

import com.my.pivoteer.api.user.model.User
import com.my.pivoteer.api.user.model.dto.UserDto

object UserMapper {
    fun toDTO(user: User) = UserDto(
        id = user.id,
        email = user.email,
        subscriptionId = user.subscriptionId,
        subscriptionStatus = user.subscriptionStatus
    )

    fun toEntity(dto: UserDto) = User(
        email = dto.email,
        password = "", // Password should not be included in DTO
        subscriptionId = dto.subscriptionId,
        subscriptionStatus = dto.subscriptionStatus
    )
}
