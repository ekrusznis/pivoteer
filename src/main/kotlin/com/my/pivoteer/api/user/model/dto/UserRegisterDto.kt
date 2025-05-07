package com.my.pivoteer.api.user.model.dto

import java.util.*

data class UserRegisterDto(
    val firstName: String,
    val lastName: String,
    val email: String,
    val password: String,
    val birthDate: Date
) {

}
