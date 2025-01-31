package com.my.pivoteer.upload

import com.my.pivoteer.api.uploads.model.FileUpload
import com.my.pivoteer.api.uploads.repository.FileUploadRepository
import com.my.pivoteer.api.uploads.service.FileUploadService
import com.my.pivoteer.api.user.model.User
import com.my.pivoteer.api.user.repository.UserRepository
import io.mockk.*
import io.mockk.junit5.MockKExtension
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.junit.jupiter.api.assertThrows
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.web.multipart.MultipartFile
import java.time.Instant
import java.time.LocalDateTime
import java.util.*
import kotlin.test.assertEquals
import kotlin.test.assertNotNull

@SpringBootTest
@ExtendWith(MockKExtension::class)
class FileUploadServiceTests {

    @MockBean
    private lateinit var fileUploadRepository: FileUploadRepository

    @MockBean
    private lateinit var userRepository: UserRepository

    @Autowired
    private lateinit var fileUploadService: FileUploadService

    private val testUser = User(
        id = UUID.randomUUID(),
        email = "user@example.com",
        password = "hashedPassword",
        createdAt = Date.from(Instant.now()),
        updatedAt = Date.from(Instant.now())
    )

    private val testFile = FileUpload(
        id = UUID.randomUUID(),
        user = testUser,
        filename = "test.xlsx",
        fileType = "xlsx",
        fileSize = 12345,
        fileData = byteArrayOf(),
        uploadedAt = LocalDateTime.now()
    )

    @Test
    fun `should upload file successfully`() {
        every { userRepository.findById(testUser.id) } returns Optional.of(testUser)
        every { fileUploadRepository.save(any()) } returns testFile

        val mockMultipartFile = mockk<MultipartFile>(relaxed = true)
        every { mockMultipartFile.originalFilename } returns "test.xlsx"
        every { mockMultipartFile.contentType } returns "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        every { mockMultipartFile.size } returns 12345
        every { mockMultipartFile.bytes } returns byteArrayOf()

        val uploadedFile = fileUploadService.uploadFile(testUser.id, mockMultipartFile)

        assertEquals("test.xlsx", uploadedFile.filename)
    }

    @Test
    fun `should fetch files by user`() {
        every { fileUploadRepository.findByUserId(testUser.id) } returns listOf(testFile)

        val files = fileUploadService.getFilesByUserId(testUser.id)

        assertEquals(1, files.size)
        assertEquals("test.xlsx", files[0].filename)
    }

    @Test
    fun `should fetch file by ID`() {
        every { fileUploadRepository.findById(testFile.id) } returns Optional.of(testFile)

        val file = fileUploadService.getFileById(testFile.id)

        assertNotNull(file)
        assertEquals("test.xlsx", file.filename)
    }

    @Test
    fun `should throw exception when file is not found`() {
        every { fileUploadRepository.findById(any()) } returns Optional.empty()

        val exception = assertThrows<Exception> {
            fileUploadService.getFileById(UUID.randomUUID())
        }

        assertEquals("File not found", exception.message)
    }
}
