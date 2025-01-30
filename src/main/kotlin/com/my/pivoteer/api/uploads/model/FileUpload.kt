package com.my.pivoteer.api.uploads.model

import com.my.pivoteer.api.user.model.User
import java.time.LocalDateTime
import java.util.*
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.Lob
import javax.persistence.ManyToOne
import javax.persistence.Table

@Entity
@Table(name = "file_uploads")
data class FileUpload(
    @Id
    val id: UUID = UUID.randomUUID(),

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    val user: User,

    @Column(nullable = false)
    val filename: String,

    @Column(nullable = false)
    val fileType: String, // XLS, XLSX, CSV

    @Column(nullable = false)
    val fileSize: Long, // File size in bytes

    @Lob
    @Column(nullable = false)
    val fileData: ByteArray, // Store file as binary (Optional: Use external storage)

    @Column(name = "uploaded_at", columnDefinition = "TIMESTAMP")
    val uploadedAt: LocalDateTime = LocalDateTime.now()
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as FileUpload

        if (!fileData.contentEquals(other.fileData)) return false

        return true
    }

    override fun hashCode(): Int {
        return fileData.contentHashCode()
    }
}
