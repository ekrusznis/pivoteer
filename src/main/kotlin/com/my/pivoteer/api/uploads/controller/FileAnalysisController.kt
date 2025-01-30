package com.my.pivoteer.api.uploads.controller

import com.my.pivoteer.api.uploads.model.dto.FileAnalysisOptionsDto
import com.my.pivoteer.api.uploads.service.FileAnalysisService
import com.my.pivoteer.api.utils.response.ApiResponse
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
@RequestMapping("/api/files")
class FileAnalysisController(
    private val fileAnalysisService: FileAnalysisService
) {

    @GetMapping("/analysis-options")
    fun getFileAnalysisOptions(@RequestParam("fileId") fileId: UUID): ApiResponse<FileAnalysisOptionsDto> {
        val options = fileAnalysisService.getAnalysisOptions(fileId)
        return ApiResponse(true, "Fetched analysis options", options)
    }
}
