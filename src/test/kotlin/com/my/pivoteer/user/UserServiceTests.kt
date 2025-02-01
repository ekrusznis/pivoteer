package com.my.pivoteer.user

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.Mockito.*
import org.mockito.junit.jupiter.MockitoExtension
import java.util.*

@ExtendWith(MockitoExtension::class)
class UserServiceTests {

//    @Mock
//    private lateinit var userRepository: UserRepository
//
//    @InjectMocks
//    private lateinit var userService: UserService
//
//    private val testUser = User(
//        id = UUID.randomUUID(),
//        email = "user@example.com",
//        password = "hashedPassword",
//        createdAt = Date.from(Instant.now()),
//        updatedAt = Date.from(Instant.now())
//    )
//
//    @Test
//    fun `should create a new user`() {
//        val newUser = User(
//            id = UUID.randomUUID(),
//            email = testUser.email,
//            password = "hashedPassword",
//            createdAt = Date.from(Instant.now()),
//            updatedAt = Date.from(Instant.now())
//        )
//
//        `when`(userRepository.save(any())).thenReturn(newUser)
//
//        val createdUser = userService.createUser(newUser)
//
//        assertNotNull(createdUser)
//        assertEquals(testUser.email, createdUser.email)
//    }
//
//    @Test
//    fun `should retrieve user by ID`() {
//        `when`(userRepository.findById(testUser.id)).thenReturn(Optional.of(testUser))
//
//        val foundUser = userService.findUserById(testUser.id)
//
//        assertNotNull(foundUser)
//        assertEquals(testUser.email, foundUser?.email)
//    }
//
//    @Test
//    fun `should throw exception when user not found`() {
//        `when`(userRepository.findById(any())).thenReturn(Optional.empty())
//
//        val exception = assertThrows<IllegalArgumentException> {
//            userService.findUserById(UUID.randomUUID())
//        }
//        assertEquals("User not found", exception.message)
//    }
//
//    @Test
//    fun `should delete user successfully`() {
//        `when`(userRepository.findById(testUser.id)).thenReturn(Optional.of(testUser))
//        doNothing().`when`(userRepository).delete(any())
//
//        userService.deleteUser(testUser.id)
//
//        verify(userRepository, times(1)).delete(testUser)
//    }
}
