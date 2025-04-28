package com.my.pivoteer.api.macro.model.dto

data class MacroOptionDto(
    val macroType: String,
    val description: String,
    val affectedColumns: List<String>,
    val exampleRows: List<Map<String, String>>
)
