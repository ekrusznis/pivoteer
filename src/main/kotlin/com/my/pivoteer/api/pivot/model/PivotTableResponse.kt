package com.my.pivoteer.api.pivot.model

import com.my.pivoteer.api.pivot.model.dto.PivotDataDto
import java.util.*

data class PivotTableResponse (
    val success: Boolean,
    val message: String,
    val data: List<PivotDataDto>,
)