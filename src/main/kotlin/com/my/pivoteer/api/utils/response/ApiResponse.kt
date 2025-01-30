package com.my.pivoteer.api.utils.response

data class ApiResponse<T>(
    val success: Boolean,
    val message: String,
    val data: T? = null
)
