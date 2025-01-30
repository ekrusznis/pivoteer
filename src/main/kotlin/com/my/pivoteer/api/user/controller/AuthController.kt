package com.my.pivoteer.api.user.controller

import com.my.pivoteer.api.user.model.dto.AuthRequestDTO
import com.my.pivoteer.api.user.model.dto.AuthResponseDTO
import com.my.pivoteer.api.user.model.dto.UserDto
import com.my.pivoteer.api.user.service.AuthService
import com.my.pivoteer.api.user.service.UserService
import com.my.pivoteer.api.utils.response.ApiResponse
import com.my.pivoteer.api.utils.token.JwtUtil
import org.springframework.http.ResponseEntity
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.*
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletResponse

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val authService: AuthService,
    private val userService: UserService,
    private val passwordEncoder: PasswordEncoder,
    private val jwtUtil: JwtUtil
) {

    @PostMapping("/register")
    fun register(@RequestBody request: AuthRequestDTO): ApiResponse<AuthResponseDTO> {
        val userDTO = UserDto(email = request.email)
        val response = authService.register(userDTO, request.password)
        return ApiResponse(true, "User registered successfully", response)
    }

    @PostMapping("/logout")
    fun logout(response: HttpServletResponse): ResponseEntity<String> {
        val cookie = Cookie("jwt", "").apply {
            isHttpOnly = true
            secure = false
            path = "/"
            maxAge = 0 // ✅ Deletes the cookie immediately
        }

        response.addCookie(cookie)
        return ResponseEntity.ok("Logged out successfully")
    }

    @PostMapping("/login")
    fun login(@RequestBody authRequest: AuthRequestDTO, response: HttpServletResponse): ResponseEntity<ApiResponse<AuthResponseDTO>> {
        val user = userService.findUserByEmail(authRequest.email)
            ?: throw IllegalArgumentException("Invalid email or password")

        if (!passwordEncoder.matches(authRequest.password, user.password)) {
            throw IllegalArgumentException("Invalid email or password")
        }

        val token = jwtUtil.generateToken(user.id) // ✅ Generate token using userId

        // ✅ Set JWT as HTTP-only Cookie
        val cookie = Cookie("jwt", token)
        cookie.isHttpOnly = true
        cookie.path = "/"
        cookie.maxAge = 60 * 60 * 24 // 1 day expiration

        response.addCookie(cookie)

        return ResponseEntity.ok(ApiResponse(true, "Login successful", AuthResponseDTO(token, user.id)))
    }
}
