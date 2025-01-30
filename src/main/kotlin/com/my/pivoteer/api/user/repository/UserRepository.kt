package com.my.pivoteer.api.user.repository

import com.my.pivoteer.api.user.model.User
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface UserRepository : JpaRepository<User, UUID> {
    fun findByEmail(email: String): User? // For authentication
}
