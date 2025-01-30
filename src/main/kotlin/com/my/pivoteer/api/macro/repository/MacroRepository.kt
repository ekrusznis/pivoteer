package com.my.pivoteer.api.macro.repository

import com.my.pivoteer.api.macro.model.Macro
import com.my.pivoteer.api.uploads.model.FileUpload
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface MacroRepository : JpaRepository<Macro, UUID> {
    fun findByFile(file: FileUpload): List<Macro>
}