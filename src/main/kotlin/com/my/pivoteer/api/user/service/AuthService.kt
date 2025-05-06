package com.my.pivoteer.api.user.service

import com.my.pivoteer.api.user.model.dto.AuthRequestDTO
import com.my.pivoteer.api.user.model.dto.AuthResponseDTO
import com.my.pivoteer.api.user.model.dto.UserDto
import com.my.pivoteer.api.user.repository.UserRepository
import com.my.pivoteer.api.user.service.mapper.UserMapper
import com.my.pivoteer.api.utils.token.JwtUtil
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletResponse

@Service
class AuthService(private val userRepository: UserRepository, private val jwtUtil: JwtUtil) {
    private val passwordEncoder = BCryptPasswordEncoder()

    fun register(userDTO: UserDto, password: String): UserDto {
        if (userRepository.findByEmail(userDTO.email) != null) {
            throw IllegalArgumentException("Email already registered")
        }

        val user = UserMapper.toEntity(userDTO).copy(password = passwordEncoder.encode(password))
        val savedUser = userRepository.save(user)

        return UserMapper.toDTO(savedUser)
    }

    fun login(authRequest: AuthRequestDTO, response: HttpServletResponse): AuthResponseDTO {
        val user = userRepository.findByEmail(authRequest.email)
            ?: throw IllegalArgumentException("Invalid email or password")

        if (!passwordEncoder.matches(authRequest.password, user.password)) {
            throw IllegalArgumentException("Invalid email or password")
        }

        val token = jwtUtil.generateToken(user.id) // ✅ Generate token using `userId`
        println("TOKEN RECEIVED: $token")

        val cookie = Cookie("jwt", token).apply {
            isHttpOnly = true  // ✅ Prevents JavaScript access
            path = "/"         // ✅ Available across the entire site
            maxAge = 60 * 60 * 24  // (Optional) Expires in 1 day
        }
        response.addCookie(cookie)  // ✅ Add to response

        return AuthResponseDTO(token, user.id) // ✅ Return `userId`
    }
}
