package com.my.pivoteer.analysis

import io.mockk.junit5.MockKExtension
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.boot.test.context.SpringBootTest
import java.util.*

@SpringBootTest
@ExtendWith(MockKExtension::class)
class FileAnalysisServiceTests {

//    @MockBean
//    private lateinit var fileUploadRepository: FileUploadRepository
//
//    @Autowired
//    private lateinit var fileAnalysisService: FileAnalysisService
//
//    private val testUser = User(
//        id = UUID.randomUUID(),
//        email = "user@example.com",
//        password = "hashedPassword",
//        createdAt = Date.from(Instant.now()),
//        updatedAt = Date.from(Instant.now())
//    )
//
//    private val testFile = FileUpload(
//        id = UUID.randomUUID(),
//        user = testUser,
//        filename = "test.xlsx",
//        fileType = "xlsx",
//        fileSize = 12345,
//        fileData = byteArrayOf(),
//        uploadedAt = LocalDateTime.now()
//    )
//
//    @Test
//    fun `should analyze file and return options`() {
//        every { fileUploadRepository.findById(testFile.id) } returns Optional.of(testFile)
//
//        val result = fileAnalysisService.getAnalysisOptions(testFile.id)
//
//        assertNotNull(result, "Analysis result should not be null")
//        assertTrue(result.pivotTables.isNotEmpty(), "Pivot tables should be suggested")
//        assertTrue(result.visualizations.isNotEmpty(), "Visualizations should be suggested")
//        assertTrue(result.macros.isNotEmpty(), "Macros should be suggested")
//
//        // ✅ Additional Assertions (Verifying pivot tables, charts, and macros exist)
//        result.pivotTables.forEach {
//            assertNotNull(it.title, "Pivot table title should not be null")
//            assertNotNull(it.description, "Pivot table description should not be null")
//        }
//
//        result.visualizations.forEach {
//            assertNotNull(it.title, "Visualization title should not be null")
//            assertNotNull(it.description, "Visualization description should not be null")
//            assertNotNull(it.previewUrl, "Visualization preview URL should not be null")
//        }
//
//        result.macros.forEach {
//            assertNotNull(it.title, "Macro title should not be null")
//            assertNotNull(it.description, "Macro description should not be null")
//        }
//    }
//
//    @Test
//    fun `should throw error if file not found`() {
//        every { fileUploadRepository.findById(any<UUID>()) } returns Optional.empty()
//
//        val exception = assertThrows<Exception> {
//            fileAnalysisService.getAnalysisOptions(UUID.randomUUID())
//        }
//
//        assertEquals("File not found", exception.message, "Exception message should indicate file was not found")
//    }
}
