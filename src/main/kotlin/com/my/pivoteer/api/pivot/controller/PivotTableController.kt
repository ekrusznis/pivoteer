package com.my.pivoteer.api.pivot.controller

import com.my.pivoteer.api.pivot.model.PivotTableResponse
import com.my.pivoteer.api.pivot.model.dto.PivotTableDto
import com.my.pivoteer.api.pivot.service.PivotTableService
import com.my.pivoteer.api.pivot.service.mapper.PivotTableMapper
import com.my.pivoteer.api.uploads.service.FileUploadService
import com.my.pivoteer.api.user.service.UserService
import com.my.pivoteer.api.utils.response.ApiResponse
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
@RequestMapping("/api/pivot-tables")
class PivotTableController(
    private val pivotTableService: PivotTableService,
    private val userService: UserService,
    private val fileUploadService: FileUploadService
) {

    @PostMapping
    fun createPivotTable(@RequestBody pivotTableDTO: PivotTableDto): ApiResponse<PivotTableDto> {
        val user = userService.findUserById(pivotTableDTO.userId)
            ?: return ApiResponse(false, "User not found")
        val file = fileUploadService.getFileById(pivotTableDTO.fileId)
            ?: return ApiResponse(false, "File not found")

        val pivotTable = pivotTableService.createPivotTable(PivotTableMapper.toEntity(pivotTableDTO, user, file))
        return ApiResponse(true, "Pivot table created successfully", PivotTableMapper.toDTO(pivotTable))
    }

    @GetMapping
    fun fetchPivotTableData(@PathVariable fileId: UUID): ApiResponse<PivotTableResponse> {
        return ApiResponse(true, "Pivot table created successfully", pivotTableService.fetchDocumentData(fileId, "PIVOT"))
    }

    @GetMapping("/file/{fileId}")
    fun getPivotTablesByFile(@PathVariable fileId: UUID): ApiResponse<List<PivotTableDto>> {
        val file = fileUploadService.getFileById(fileId)
            ?: return ApiResponse(false, "File not found")

        val pivotTables = pivotTableService.getPivotTablesByFile(file)
        return ApiResponse(true, "Pivot tables retrieved successfully", pivotTables.map { PivotTableMapper.toDTO(it) })
    }

    @DeleteMapping("/{id}")
    fun deletePivotTable(@PathVariable id: UUID): ApiResponse<Unit> {
        val pivotTable = pivotTableService.getPivotTableById(id) ?: return ApiResponse(false, "Pivot table not found")
        pivotTableService.createPivotTable(pivotTable.copy(pivotConfiguration = "")) // Clear configuration
        return ApiResponse(true, "Pivot table deleted successfully")
    }
}