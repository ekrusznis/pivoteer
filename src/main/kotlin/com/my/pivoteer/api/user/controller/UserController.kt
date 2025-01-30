package com.my.pivoteer.api.user.controller

import com.my.pivoteer.api.user.model.dto.UserDto
import com.my.pivoteer.api.user.service.UserService
import com.my.pivoteer.api.user.service.mapper.UserMapper
import com.my.pivoteer.api.utils.response.ApiResponse
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/api/users")
class UserController(private val userService: UserService) {

    @GetMapping("/{id}")
    fun getUser(@PathVariable id: UUID): ApiResponse<UserDto> {
        val user = userService.findUserById(id) ?: return ApiResponse(false, "User not found")
        return ApiResponse(true, "User fetched", UserMapper.toDTO(user))
    }
}
