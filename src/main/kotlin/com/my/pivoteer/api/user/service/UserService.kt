package com.my.pivoteer.api.user.service

import com.my.pivoteer.api.uploads.service.FileUploadService
import com.my.pivoteer.api.user.model.User
import com.my.pivoteer.api.user.model.dto.UserProfileDto
import com.my.pivoteer.api.user.repository.UserRepository
import com.my.pivoteer.api.user.service.mapper.UserMapper
import org.springframework.stereotype.Service
import java.util.*

@Service
class UserService(
    private val userRepository: UserRepository,
    private val fileUploadService: FileUploadService
    ) {

    fun createUser(user: User): User {
        return userRepository.save(user)
    }

    fun findUserById(id: UUID): User? {
        return userRepository.findById(id).orElse(null)
    }

    fun findUserByEmail(email: String): User? {
        return userRepository.findByEmail(email)
    }

    fun deleteUser(id: UUID): String? {
        userRepository.deleteById(id)
        return "User deleted successfully"
    }

    fun updateUser(user: User): User {
        return userRepository.save(user)
    }

    fun getUserProfileInfo(id: UUID): UserProfileDto {
        val user = findUserById(id) ?: throw java.lang.Exception("User not found with this ID: $id")

        val totalFilesUploaded = fileUploadService.getFilesByUserId(id)

        return UserMapper.toProfileDTO(user, totalFilesUploaded)
    }
}