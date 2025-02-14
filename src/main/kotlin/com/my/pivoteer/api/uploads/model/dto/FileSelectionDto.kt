package com.my.pivoteer.api.uploads.model.dto

import java.util.*

data class FileSelectionDto(
    val fileId: UUID,
    val pivotTables: List<String>,
    val visualizations: List<String>,
    val macros: List<String>
)
