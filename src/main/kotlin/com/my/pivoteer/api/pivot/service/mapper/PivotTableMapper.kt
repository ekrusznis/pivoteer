package com.my.pivoteer.api.pivot.service.mapper

import com.my.pivoteer.api.pivot.model.PivotTable
import com.my.pivoteer.api.pivot.model.dto.PivotTableDto
import com.my.pivoteer.api.uploads.model.FileUpload
import com.my.pivoteer.api.user.model.User

object PivotTableMapper {
    fun toDTO(pivotTable: PivotTable) = PivotTableDto(
        id = pivotTable.id,
        userId = pivotTable.user.id,
        fileId = pivotTable.file.id,
        pivotName = pivotTable.pivotName,
        pivotConfiguration = pivotTable.pivotConfiguration
    )

    fun toEntity(dto: PivotTableDto, user: User, file: FileUpload) = PivotTable(
        user = user,
        file = file,
        pivotName = dto.pivotName,
        pivotConfiguration = dto.pivotConfiguration
    )
}