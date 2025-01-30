package com.my.pivoteer.api.pivot.model.dto

import java.util.*

data class PivotTableDto(
    val id: UUID? = null,
    val userId: UUID,
    val fileId: UUID,
    val pivotName: String,
    val pivotConfiguration: String
)
