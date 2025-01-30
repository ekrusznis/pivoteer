package com.my.pivoteer.api.macro.model.dto

import java.util.*

data class MacroDto(
    val id: UUID? = null,
    val userId: UUID,
    val fileId: UUID,
    val macroName: String,
    val macroDefinition: String
)