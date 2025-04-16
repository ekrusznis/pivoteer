package com.my.pivoteer.api.uploads.repository

import com.my.pivoteer.api.uploads.model.FileUpload
import com.my.pivoteer.api.user.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import java.util.*

interface FileUploadRepository : JpaRepository<FileUpload, UUID> {
    fun findAllByUser(user: User): List<FileUpload>
    fun findByUserId(userId: UUID): List<FileUpload>

    // ✅ Custom Query to Fetch Only Metadata (Excluding file_data)
    @Query("SELECT f.id, f.user.id, f.filename, f.fileType, f.fileSize, f.uploadedAt FROM FileUpload f WHERE f.user.id = :userId")
    fun findFileMetadataByUserId(userId: UUID): List<Array<Any>>
    
    
    

}