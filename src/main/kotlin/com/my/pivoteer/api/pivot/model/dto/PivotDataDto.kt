package com.my.pivoteer.api.pivot.model.dto

import java.util.*

data class PivotDataDto (
    val columnName: String,
    val dataType: String,
    val examples: List<String>,
)