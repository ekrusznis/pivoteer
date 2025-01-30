package com.my.pivoteer.api.macro.service.mapper

import com.my.pivoteer.api.macro.model.Macro
import com.my.pivoteer.api.macro.model.dto.MacroDto
import com.my.pivoteer.api.uploads.model.FileUpload
import com.my.pivoteer.api.user.model.User

object MacroMapper {
    fun toDTO(macro: Macro) = MacroDto(
        id = macro.id,
        userId = macro.user.id,
        fileId = macro.file.id,
        macroName = macro.macroName,
        macroDefinition = macro.macroDefinition
    )

    fun toEntity(dto: MacroDto, user: User, file: FileUpload) = Macro(
        user = user,
        file = file,
        macroName = dto.macroName,
        macroDefinition = dto.macroDefinition
    )
}