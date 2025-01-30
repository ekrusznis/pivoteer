package com.my.pivoteer.api.macro.service

import com.my.pivoteer.api.macro.model.Macro
import com.my.pivoteer.api.macro.repository.MacroRepository
import com.my.pivoteer.api.uploads.model.FileUpload
import org.springframework.stereotype.Service
import java.util.*

@Service
class MacroService(private val macroRepository: MacroRepository) {

    fun createMacro(macro: Macro): Macro {
        return macroRepository.save(macro)
    }

    fun getMacrosByFile(file: FileUpload): List<Macro> {
        return macroRepository.findByFile(file)
    }

    fun getMacroById(id: UUID): Macro? {
        return macroRepository.findById(id).orElse(null)
    }
}