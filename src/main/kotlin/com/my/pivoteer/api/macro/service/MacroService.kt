package com.my.pivoteer.api.macro.service

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.KotlinModule
import com.my.pivoteer.api.macro.model.Macro
import com.my.pivoteer.api.macro.model.dto.MacroOptionDto
import com.my.pivoteer.api.macro.model.dto.ParsedFileData
import com.my.pivoteer.api.macro.repository.MacroRepository
import com.my.pivoteer.api.uploads.model.FileUpload
import org.springframework.stereotype.Service
import java.util.*

@Service
class MacroService(private val macroRepository: MacroRepository) {

    fun generateMacroOptions(file: FileUpload): List<MacroOptionDto> {
        val parsedData = parseFileData(String(file.fileData))
        val options = mutableListOf<MacroOptionDto>()

        // 1. Detect columns with duplicates
        parsedData.columns.forEach { column ->
            val values = parsedData.sampleRows.mapNotNull { it[column] }
            if (values.size != values.toSet().size) { // duplicates exist
                options.add(
                    MacroOptionDto(
                        macroType = "Remove Duplicates",
                        description = "Removes duplicate rows based on the '$column' column.",
                        affectedColumns = listOf(column),
                        exampleRows = parsedData.sampleRows.take(2)
                    )
                )
            }
        }

        // 2. Detect numeric columns
        parsedData.columns.filter { isNumericColumn(parsedData, it) }.forEach { column ->
            options.add(
                MacroOptionDto(
                    macroType = "Detect Outliers",
                    description = "Identifies extreme values in the '$column' column.",
                    affectedColumns = listOf(column),
                    exampleRows = findOutliers(parsedData, column)
                )
            )
        }

        // 3. Detect missing data
        parsedData.columns.forEach { column ->
            if (parsedData.sampleRows.any { it[column].isNullOrEmpty() }) {
                options.add(
                    MacroOptionDto(
                        macroType = "Fill Missing Data",
                        description = "Allows you to fill missing values in '$column'.",
                        affectedColumns = listOf(column),
                        exampleRows = parsedData.sampleRows.take(2)
                    )
                )
            }
        }

        // 4. Detect date columns
        parsedData.columns.filter { isDateColumn(parsedData, it) }.forEach { column ->
            options.add(
                MacroOptionDto(
                    macroType = "Sort by Date",
                    description = "Sorts rows based on the '$column' date values.",
                    affectedColumns = listOf(column),
                    exampleRows = parsedData.sampleRows.take(2)
                )
            )
        }

        return options
    }
    private fun isNumericColumn(parsedData: ParsedFileData, column: String): Boolean {
        return parsedData.sampleRows.count { it[column]?.toDoubleOrNull() != null } > parsedData.sampleRows.size / 2
    }

    private fun isDateColumn(parsedData: ParsedFileData, column: String): Boolean {
        return parsedData.sampleRows.count {
            it[column]?.matches(Regex("\\d{4}-\\d{2}-\\d{2}")) == true
        } > parsedData.sampleRows.size / 2
    }

    private fun findOutliers(parsedData: ParsedFileData, column: String): List<Map<String, String>> {
        val values = parsedData.sampleRows.mapNotNull { it[column]?.toDoubleOrNull() }
        if (values.isEmpty()) return emptyList()

        val min = values.minOrNull()!!
        val max = values.maxOrNull()!!

        return parsedData.sampleRows.filter {
            it[column]?.toDoubleOrNull() == min || it[column]?.toDoubleOrNull() == max
        }.take(2)
    }

    private fun parseFileData(jsonData: String): ParsedFileData {
        val objectMapper = ObjectMapper()
            .registerModule(KotlinModule.Builder().build())
            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)

        val typeRef = object : TypeReference<ParsedFileData>() {}
        return objectMapper.readValue(jsonData, typeRef)
    }

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