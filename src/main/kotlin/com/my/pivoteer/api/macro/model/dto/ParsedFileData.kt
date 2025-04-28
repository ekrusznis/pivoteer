package com.my.pivoteer.api.macro.model.dto

data class ParsedFileData(
    val columns: List<String>,
    val sampleRows: List<Map<String, String>>
)
