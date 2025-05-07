package com.my.pivoteer.api.macro.controller

import com.my.pivoteer.api.macro.model.dto.MacroDto
import com.my.pivoteer.api.macro.model.dto.MacroOptionDto
import com.my.pivoteer.api.macro.service.MacroService
import com.my.pivoteer.api.macro.service.mapper.MacroMapper
import com.my.pivoteer.api.uploads.service.FileUploadService
import com.my.pivoteer.api.user.service.UserService
import com.my.pivoteer.api.utils.response.ApiResponse
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/api/macros")
class MacroController(
    private val macroService: MacroService,
    private val userService: UserService,
    private val fileUploadService: FileUploadService
) {

    @PostMapping
    fun createMacro(@RequestBody macroDTO: MacroDto): ApiResponse<MacroDto> {
        val user = userService.findUserById(macroDTO.userId)
            ?: return ApiResponse(false, "User not found")
        val file = fileUploadService.getFileById(macroDTO.fileId)
            ?: return ApiResponse(false, "File not found")

        val macro = macroService.createMacro(MacroMapper.toEntity(macroDTO, user, file))
        return ApiResponse(true, "Macro created successfully", MacroMapper.toDTO(macro))
    }

    @GetMapping("/options/{userId}/{fileId}")
    fun getMacroOptions(
        @PathVariable userId: UUID,
        @PathVariable fileId: UUID
    ): ApiResponse<List<MacroOptionDto>> {
        userService.findUserById(userId)
            ?: return ApiResponse(false, "User not found")

        val file = fileUploadService.getFileById(fileId)
            ?: return ApiResponse(false, "File not found")

        val macroOptions = macroService.generateMacroOptions(file)
        return ApiResponse(true, "Macro options fetched", macroOptions)
    }

    @GetMapping("/file/{fileId}")
    fun getMacrosByFile(@PathVariable fileId: UUID): ApiResponse<List<MacroDto>> {
        val file = fileUploadService.getFileById(fileId)
            ?: return ApiResponse(false, "File not found")

        val macros = macroService.getMacrosByFile(file)
        return ApiResponse(true, "Macros retrieved successfully", macros.map { MacroMapper.toDTO(it) })
    }

    @DeleteMapping("/{id}")
    fun deleteMacro(@PathVariable id: UUID): ApiResponse<Unit> {
        val macro = macroService.getMacroById(id) ?: return ApiResponse(false, "Macro not found")
        macroService.createMacro(macro.copy(macroDefinition = "")) // Clear definition
        return ApiResponse(true, "Macro deleted successfully")
    }
}