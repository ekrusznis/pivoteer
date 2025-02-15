package com.my.pivoteer.api.uploads.controller

import com.my.pivoteer.api.uploads.model.dto.FileUploadDto
import com.my.pivoteer.api.uploads.service.FileUploadService
import com.my.pivoteer.api.user.service.UserService
import com.my.pivoteer.api.utils.response.ApiResponse
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.util.*
import javax.servlet.http.HttpServletResponse
import javax.transaction.Transactional

@RestController
@RequestMapping("/api/files")
class FileUploadController(
    private val fileUploadService: FileUploadService,
    private val userService: UserService
) {

    @PostMapping("/upload")
    fun uploadFile(
        @RequestParam("file") file: MultipartFile,
        authentication: Authentication
    ): ApiResponse<FileUploadDto> {
        val user = userService.findUserById(UUID.fromString(authentication.name))
            ?: throw Exception("No user found for this auth")

        val savedFile = fileUploadService.uploadFile(user.id, file)
        return ApiResponse(true, "File uploaded successfully", savedFile)
    }

    @GetMapping("/user")
    fun getUserFiles(@RequestParam("userId") userId: UUID): ApiResponse<List<FileUploadDto>> {
        val user = userService.findUserById(userId)
            ?: throw Exception("No user found for this ID")

        val files = fileUploadService.getFilesByUserId(user.id)
        return ApiResponse(true, "Fetched user files", files)
    }

    @GetMapping("/download/{fileId}", produces = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"])
    fun downloadFile(@PathVariable fileId: UUID, response: HttpServletResponse) {
        val file = fileUploadService.getFileById(fileId)
            ?: throw Exception("File not found")

        response.contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        response.setHeader("Content-Disposition", "attachment; filename=\"${file.filename}\"")
        response.outputStream.write(file.fileData) // ✅ Streams the file

        response.outputStream.flush()
    }

    @Transactional
    @DeleteMapping("/delete/{fileId}")
    fun deleteFile(@PathVariable fileId: UUID): ApiResponse<String> {
        fileUploadService.deleteFile(fileId)
        return ApiResponse(true, "File deleted successfully")
    }

}
