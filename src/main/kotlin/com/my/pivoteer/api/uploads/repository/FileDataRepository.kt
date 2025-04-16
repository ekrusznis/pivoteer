package com.my.pivoteer.api.uploads.repository

import com.my.pivoteer.api.uploads.model.FileUpload
import com.my.pivoteer.api.uploads.model.FlatFileData
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface FileDataRepository : JpaRepository<FlatFileData, UUID> {
}