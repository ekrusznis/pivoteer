package com.my.pivoteer.api.macro.model.dto

data class ParsedFileData(
    val columns: List<String>,
    val rows: List<Map<String, String>>
)
