package com.my.pivoteer.api.pivot.repository

import com.my.pivoteer.api.pivot.model.PivotTable
import com.my.pivoteer.api.uploads.model.FileUpload
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface PivotTableRepository : JpaRepository<PivotTable, UUID> {
    fun findByFile(file: FileUpload): List<PivotTable>
}