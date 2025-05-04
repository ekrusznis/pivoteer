package com.my.pivoteer.api.user.model.dto

import java.util.Date

data class UserRegisterDto (
    val firstName: String,
    val lastName: String,
    val email: String,
    val password: String,
    val birthDate: Date
)