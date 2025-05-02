package com.my.pivoteer.api.uploads.service

import com.my.pivoteer.api.uploads.model.FileUpload
import com.my.pivoteer.api.uploads.model.dto.ShareSettingsDto
import com.my.pivoteer.api.user.enum.AddonType
import com.my.pivoteer.api.user.repository.UserRepository
import com.my.pivoteer.api.user.service.SubscriptionService
import com.my.pivoteer.api.utils.response.ApiResponse
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.util.*

@Service
class FileActionService(
    private val fileUploadService: FileUploadService,
    private val userRepository: UserRepository,
    private val subscriptionService: SubscriptionService
) {

    fun exportFile(userId: UUID, fileId: UUID, format: String): ResponseEntity<ByteArray> {
        val file = fileUploadService.getFileById(fileId)
            ?: throw RuntimeException("File not found")

        val data = when (format.lowercase()) {
            "csv" -> exportAsCsv(file)
            "pdf" -> exportAsPdf(file)
            "xlsx" -> exportAsXlsx(file)
            else -> throw IllegalArgumentException("Unsupported format")
        }

        val headers = HttpHeaders().apply {
            contentType = MediaType.APPLICATION_OCTET_STREAM
            setContentDispositionFormData("attachment", "export.$format")
        }

        return ResponseEntity(data, headers, HttpStatus.OK)
    }

    fun shareFile(userId: UUID, settings: ShareSettingsDto): ApiResponse<Map<String, Any>> {
        val user = userRepository.findById(userId).orElse(null)
            ?: return ApiResponse(false, "User not found")

        val subscription = subscriptionService.getSubscriptionByUserId(userId)
            ?: return ApiResponse(false, "No active subscription")

        if (settings.allowPin && AddonType.ADVANCED_SECURITY !in subscription.addons) {
            return ApiResponse(false, "Advanced security addon required to enable PIN protection")
        }

        val expiresAt = LocalDateTime.now().plusDays((settings.expiresInDays ?: 7).toLong())
        val shareUrl = "https://mypivoteer.com/share/${UUID.randomUUID()}"

        val metadata = mutableMapOf<String, Any>(
            "fileId" to settings.fileId,
            "url" to shareUrl,
            "expiresAt" to expiresAt.toString()
        )

        if (settings.allowPin) {
            metadata["pinProtected"] = true
            metadata["pin"] = settings.pinCode ?: ""
        }

        return ApiResponse(true, "Share link created", metadata)
    }

    // Stub export converters
    private fun exportAsCsv(file: FileUpload): ByteArray = "csv content".toByteArray()
    private fun exportAsPdf(file: FileUpload): ByteArray = "pdf content".toByteArray()
    private fun exportAsXlsx(file: FileUpload): ByteArray = "xlsx content".toByteArray()
}
