package com.my.pivoteer.api.uploads.service

import com.my.pivoteer.api.uploads.model.dto.*
import com.my.pivoteer.api.uploads.repository.FileUploadRepository
import org.apache.poi.ss.usermodel.CellType
import org.apache.poi.ss.usermodel.WorkbookFactory
import org.springframework.stereotype.Service
import java.io.ByteArrayInputStream
import java.util.*
import kotlin.math.sqrt

@Service
class FileAnalysisService(
    private val fileUploadRepository: FileUploadRepository
) {
    fun getAnalysisOptions(fileId: UUID): FileAnalysisOptionsDto {
        val file = fileUploadRepository.findById(fileId)
            .orElseThrow { Exception("File not found") }

        return try {
            val inputStream = ByteArrayInputStream(file.fileData)
            val workbook = WorkbookFactory.create(inputStream)
            val sheet = workbook.getSheetAt(0) ?: throw Exception("Empty sheet")

            // ✅ Extract column headers
            val columnHeaders = sheet.getRow(0)?.mapNotNull { it.stringCellValue.trim().takeIf { it.isNotEmpty() } } ?: emptyList()

            // ✅ Extract data types from second row
            val dataTypes = mutableMapOf<String, String>()
            val dataRows = mutableListOf<Map<String, Any>>()

            sheet.rowIterator().asSequence().drop(1).forEach { row ->
                val rowData = mutableMapOf<String, Any>()
                for ((index, cell) in row.cellIterator().asSequence().withIndex()) {
                    val columnName = columnHeaders.getOrNull(index) ?: continue
                    val cellValue = extractCellValue(cell)
                    if (cellValue != null) rowData[columnName] = cellValue
                    dataTypes[columnName] = detectCellType(cell)
                }
                if (rowData.isNotEmpty()) dataRows.add(rowData)
            }

            FileAnalysisOptionsDto(
                fileId = file.id,
                pivotTables = suggestPivotTables(columnHeaders, dataTypes),
                visualizations = suggestVisualizations(columnHeaders, dataTypes),
                macros = suggestMacros(columnHeaders, dataTypes, dataRows)
            )
        } catch (e: Exception) {
            throw Exception("Error processing file: ${e.message}", e)
        }
    }

    // ✅ Detects the **data type** of a column
    private fun detectCellType(cell: org.apache.poi.ss.usermodel.Cell): String {
        return when {
            cell.cellType == CellType.NUMERIC && org.apache.poi.ss.usermodel.DateUtil.isCellDateFormatted(cell) -> "Date"
            cell.cellType == CellType.NUMERIC -> "Numeric"
            cell.cellType == CellType.STRING -> "Text"
            cell.cellType == CellType.BOOLEAN -> "Boolean"
            else -> "Unknown"
        }
    }

    // ✅ Extracts the **actual value** from a cell
    private fun extractCellValue(cell: org.apache.poi.ss.usermodel.Cell): Any? {
        return when {
            cell.cellType == CellType.NUMERIC && org.apache.poi.ss.usermodel.DateUtil.isCellDateFormatted(cell) -> cell.dateCellValue
            cell.cellType == CellType.NUMERIC -> cell.numericCellValue
            cell.cellType == CellType.STRING -> cell.stringCellValue.trim().takeIf { it.isNotEmpty() }
            cell.cellType == CellType.BOOLEAN -> cell.booleanCellValue
            else -> null
        }
    }

    // ✅ Suggest **Pivot Tables** dynamically
    private fun suggestPivotTables(columns: List<String>, dataTypes: Map<String, String>): List<PivotTableOption> {
        val categoricalColumns = columns.filter { dataTypes[it] == "Text" }
        val numericColumns = columns.filter { dataTypes[it] == "Numeric" }

        return buildList {
            if (categoricalColumns.isNotEmpty() && numericColumns.isNotEmpty()) add(
                PivotTableOption(
                    title = "Summary of ${numericColumns[0]} by ${categoricalColumns[0]}",
                    description = "Groups ${numericColumns[0]} based on ${categoricalColumns[0]}."
                )
            )
            if (numericColumns.isNotEmpty()) add(
                PivotTableOption(
                    title = "Top 10 ${categoricalColumns.firstOrNull() ?: "Items"}",
                    description = "Ranks the highest values in ${numericColumns[0]}."
                )
            )
            if (categoricalColumns.size > 1) add(
                PivotTableOption(
                    title = "Breakdown of ${numericColumns.firstOrNull() ?: "data"} by ${categoricalColumns[0]} and ${categoricalColumns[1]}",
                    description = "Shows how data is distributed across ${categoricalColumns[0]} and ${categoricalColumns[1]}."
                )
            )
        }
    }

    // ✅ Suggest **Visualizations** dynamically
    private fun suggestVisualizations(columns: List<String>, dataTypes: Map<String, String>): List<VisualizationOption> {
        val categoricalColumns = columns.filter { dataTypes[it] == "Text" }
        val numericColumns = columns.filter { dataTypes[it] == "Numeric" }

        return buildList {
            if (categoricalColumns.isNotEmpty() && numericColumns.isNotEmpty()) add(
                VisualizationOption(
                    title = "Bar Chart - ${numericColumns[0]} by ${categoricalColumns[0]}",
                    description = "Displays ${numericColumns[0]} grouped by ${categoricalColumns[0]}.",
                    previewUrl = "https://example.com/bar_chart.png"
                )
            )
            if (numericColumns.isNotEmpty() && categoricalColumns.any { it.contains("date", ignoreCase = true) }) add(
                VisualizationOption(
                    title = "Line Graph - ${numericColumns[0]} over Time",
                    description = "Shows trends of ${numericColumns[0]} over time.",
                    previewUrl = "https://example.com/line_graph.png"
                )
            )
        }
    }

    // ✅ Suggest **Macros** dynamically based on data properties
    private fun suggestMacros(columns: List<String>, dataTypes: Map<String, String>, dataRows: List<Map<String, Any>>): List<MacroOption> {
        val macros = mutableListOf<MacroOption>()

        val duplicateColumns = columns.filter { col ->
            val values = dataRows.mapNotNull { it[col] }
            values.size != values.toSet().size
        }
        if (duplicateColumns.isNotEmpty()) {
            macros.add(
                MacroOption(
                    title = "Remove Duplicates",
                    description = "Removes duplicate values from ${duplicateColumns.joinToString(", ")}.",
                    affectedColumns = duplicateColumns,
                    macroType = "Data Cleaning"
                )
            )
        }

        val missingDataColumns = columns.filter { col -> dataRows.any { it[col] == null } }
        if (missingDataColumns.isNotEmpty()) {
            macros.add(
                MacroOption(
                    title = "Fill Missing Data",
                    description = "Identifies and fills missing values in ${missingDataColumns.joinToString(", ")}.",
                    affectedColumns = missingDataColumns,
                    macroType = "Data Cleaning"
                )
            )
        }

        val numericColumns = columns.filter { dataTypes[it] == "Numeric" }
        numericColumns.forEach { col ->
            val values = dataRows.mapNotNull { it[col]?.toString()?.toDoubleOrNull() }
            if (values.size > 5) {
                val mean = values.average()
                val stdDev = values.map { it - mean }.map { it * it }.average().let { sqrt(it) }
                val outliers = values.filter { it > mean + 2 * stdDev || it < mean - 2 * stdDev }
                if (outliers.isNotEmpty()) {
                    macros.add(
                        MacroOption(
                            title = "Identify Outliers",
                            description = "Detects outliers in ${col}.",
                            affectedColumns = listOf(col),
                            macroType = "Data Analysis"
                        )
                    )
                }
            }
        }

        return macros
    }
}
