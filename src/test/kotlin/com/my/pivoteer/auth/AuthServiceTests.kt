package com.my.pivoteer.auth

import com.my.pivoteer.api.user.model.User
import com.my.pivoteer.api.user.model.dto.AuthRequestDTO
import com.my.pivoteer.api.user.model.dto.UserDto
import com.my.pivoteer.api.user.repository.UserRepository
import com.my.pivoteer.api.user.service.AuthService
import com.my.pivoteer.api.utils.token.JwtUtil
import io.mockk.*
import io.mockk.junit5.MockKExtension
import org.junit.jupiter.api.*
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import java.util.*
import java.time.Instant
import java.util.Date
import org.junit.jupiter.api.Assertions.*

@ExtendWith(MockKExtension::class)
class AuthServiceTests {

    private val userRepository: UserRepository = mockk()
    private val jwtUtil: JwtUtil = mockk()

    private lateinit var authService: AuthService
    private val passwordEncoder = BCryptPasswordEncoder()

    @BeforeEach
    fun setUp() {
        MockKAnnotations.init(this)
        authService = AuthService(userRepository, jwtUtil)
    }

    private val testUser = User(
        id = UUID.randomUUID(),
        email = "test@example.com",
        password = passwordEncoder.encode("password123"),
        createdAt = Date.from(Instant.now()),
        updatedAt = Date.from(Instant.now()),
        firstName = "first",
        lastName = "last",
        birthDate = Date.from(Instant.now())
    )

    @Test
    fun `should throw error if user already exists`() {
        every { userRepository.findByEmail(testUser.email) } returns testUser

        val exception = assertThrows<IllegalArgumentException> {
            authService.register(UserDto(
                email = testUser.email,
                firstName = "first",
                lastName = "last",
                birthDate = Date.from(Instant.now())
            ), "password123")
        }
        assertEquals("Email already registered", exception.message)
    }
    @Test
    fun `should login user with correct credentials`() {
        every { userRepository.findByEmail(testUser.email) } returns testUser
        every { jwtUtil.generateToken(testUser.id) } returns "mock-token"

        val response = authService.login(AuthRequestDTO(testUser.email, "password123"), mockk(relaxed = true))

        assertNotNull(response.token)
        assertEquals(testUser.id, response.userId)  // ✅ Now checking userId instead of email
    }

    @Test
    fun `should fail login with incorrect password`() {
        every { userRepository.findByEmail(testUser.email) } returns testUser

        val exception = assertThrows<IllegalArgumentException> {
            authService.login(AuthRequestDTO(testUser.email, "wrongpassword"), mockk(relaxed = true))
        }
        assertEquals("Invalid email or password", exception.message)
    }
}
