package com.my.pivoteer.api.uploads.service

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.my.pivoteer.api.uploads.model.FileUpload
import com.my.pivoteer.api.uploads.model.FlatFileData
import com.my.pivoteer.api.uploads.model.dto.FileResponseDto
import com.my.pivoteer.api.uploads.model.dto.FileUploadDto
import com.my.pivoteer.api.uploads.repository.FileDataRepository
import com.my.pivoteer.api.uploads.repository.FileUploadRepository
import com.my.pivoteer.api.uploads.service.mapper.FileUploadMapper
import com.my.pivoteer.api.user.model.User
import com.my.pivoteer.api.user.repository.UserRepository
import org.apache.poi.ss.usermodel.WorkbookFactory
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartFile
import java.io.InputStream
import java.util.*

@Service
class FileUploadService(
    private val fileUploadRepository: FileUploadRepository,
    private val fileDataRepository: FileDataRepository,
    private val userRepository: UserRepository
    ) {

    fun uploadFile(userId: UUID, file: MultipartFile): FileUploadDto {
        val user = userRepository.findById(userId).orElseThrow { RuntimeException("User not found") }

        val mimeType = file.contentType ?: "application/octet-stream"  // Default MIME type if null


        val fileUpload = FileUpload(
            user = user,
            filename = file.originalFilename ?: "unknown",
            fileType = mimeType,
            fileSize = file.size,
            fileData = file.bytes
        )



        val savedFile = fileUploadRepository.save(fileUpload)

        val savedData = parseFilesData(file.inputStream)

        val fileData = FlatFileData(
            fileId = savedFile,
            dataObject = savedData,
            dataType = mimeType,
        )

        fileDataRepository.save(fileData);

        return FileUploadMapper.toDTO(savedFile)
    }


    fun getFilesByUser(user: User): List<FileUpload> {
        return fileUploadRepository.findAllByUser(user)
    }
    fun getFilesByUserId(userId: UUID): List<FileUploadDto> {
        val results = fileUploadRepository.findFileMetadataByUserId(userId)
        return if (results.isEmpty()){
            emptyList()
        }else{
            results.map {
                FileUploadDto(
                    id = it[0] as UUID,
                    userId = it[1] as UUID,
                    filename = it[2] as String,
                    fileType = it[3] as String,
                    fileSize = it[4] as Long,
                    uploadedAt = it[5] as Date
                )
            }
        }
    }
    fun deleteFile(fileId: UUID) {
        fileUploadRepository.deleteById(fileId)
    }

    @Transactional(readOnly = true)
    fun getFileById(id: UUID): FileUpload? {
        return fileUploadRepository.findById(id).orElse(null)
    }

    fun getFileBase64(fileId: UUID): FileResponseDto {
        val file = fileUploadRepository.findById(fileId).orElse(null)
        return FileUploadMapper.toResponseDTO(file)
    }


    private fun parseFilesData(fileUpload: InputStream): String {
        val workbook = WorkbookFactory.create(fileUpload)
        val sheet = workbook.getSheetAt(0)

        val rows = mutableListOf<Map<String, String>>()

        val headerRow = sheet.getRow(0)
        val headers = (0 until headerRow.physicalNumberOfCells).map { i ->
            headerRow.getCell(i)?.toString() ?: "Column$i"
        }

        for (i in 1..sheet.lastRowNum) {
            val row = sheet.getRow(i)
            if (row == null) continue

            val rowData = headers.mapIndexed { j, header ->
                header to (row.getCell(j)?.toString() ?: "")
            }.toMap()

            rows.add(rowData)
        }

        workbook.close()

        return jacksonObjectMapper().writeValueAsString(rows)
    }
}