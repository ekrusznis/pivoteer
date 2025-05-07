package com.my.pivoteer.api.uploads.repository

import com.my.pivoteer.api.uploads.model.FileUpload
import com.my.pivoteer.api.uploads.model.FlatFileData
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import java.util.*

interface FileDataRepository : JpaRepository<FlatFileData, UUID> {
    @Query("SELECT f.dataObject FROM FlatFileData f WHERE f.fileId = :fileId")
    fun findByFileId(fileId: UUID): String
}
