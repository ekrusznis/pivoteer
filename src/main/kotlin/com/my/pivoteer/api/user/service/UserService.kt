package com.my.pivoteer.api.user.service

import com.my.pivoteer.api.user.model.User
import com.my.pivoteer.api.user.repository.UserRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class UserService(private val userRepository: UserRepository) {

    fun createUser(user: User): User {
        return userRepository.save(user)
    }

    fun findUserById(id: UUID): User? {
        return userRepository.findById(id).orElse(null)
    }

    fun findUserByEmail(email: String): User? {
        return userRepository.findByEmail(email)
    }

    fun updateUser(user: User): User {
        return userRepository.save(user)
    }
}
