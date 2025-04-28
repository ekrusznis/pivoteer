package com.my.pivoteer.api.visualizations.controller

import com.my.pivoteer.api.uploads.service.FileUploadService
import com.my.pivoteer.api.user.service.UserService
import com.my.pivoteer.api.utils.response.ApiResponse
import com.my.pivoteer.api.visualizations.model.VisualizationOptionDto
import com.my.pivoteer.api.visualizations.service.VisualizationService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
@RequestMapping("/api/vis")
class VisualizationController(
    private val visualizationService: VisualizationService,
    private val userService: UserService,
    private val fileUploadService: FileUploadService
) {
    @GetMapping("/options/{userId}/{fileId}")
    fun getVisualizationOptions(
        @PathVariable userId: UUID,
        @PathVariable fileId: UUID
    ): ApiResponse<List<VisualizationOptionDto>> {
        userService.findUserById(userId)
            ?: return ApiResponse(false, "User not found")

        val file = fileUploadService.getFileById(fileId)
            ?: return ApiResponse(false, "File not found")
        val parsedJson = String(file.fileData)

        val visOptions = visualizationService.suggestVisualizationOptions(parsedJson)
        return ApiResponse(true, "Visualization options fetched", visOptions)
    }

}