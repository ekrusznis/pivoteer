package com.my.pivoteer.api.pivot.service

import com.my.pivoteer.api.pivot.model.PivotTable
import com.my.pivoteer.api.pivot.model.PivotTableResponse
import com.my.pivoteer.api.pivot.repository.PivotTableRepository
import com.my.pivoteer.api.uploads.model.FileUpload
import com.my.pivoteer.api.uploads.repository.FileDataRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class PivotTableService(private val pivotTableRepository: PivotTableRepository, private val fileDataRepository: FileDataRepository) {

    fun createPivotTable(pivotTable: PivotTable): PivotTable {
        return pivotTableRepository.save(pivotTable)
    }

    fun getPivotTablesByFile(file: FileUpload): List<PivotTable> {
        return pivotTableRepository.findByFile(file)
    }

    fun getPivotTableById(id: UUID): PivotTable? {
        return pivotTableRepository.findById(id).orElse(null)
    }

    fun fetchDocumentData(fileId: UUID, s: String): PivotTableResponse? {
        fileDataRepository.findByFileId(fileId)

        return PivotTableResponse(
            success = true,
            message = "Successfully fetched document",
            emptyList()
        )
    }
}
