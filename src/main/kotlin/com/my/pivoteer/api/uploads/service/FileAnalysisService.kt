package com.my.pivoteer.api.uploads.service

import com.my.pivoteer.api.uploads.model.FileUpload
import com.my.pivoteer.api.uploads.model.dto.*
import com.my.pivoteer.api.uploads.repository.FileUploadRepository
import org.apache.poi.ss.usermodel.CellType
import org.apache.poi.ss.usermodel.WorkbookFactory
import org.springframework.stereotype.Service
import java.io.BufferedReader
import java.io.ByteArrayInputStream
import java.io.ByteArrayOutputStream
import java.io.File
import java.io.InputStreamReader
import java.util.*
import java.util.zip.ZipEntry
import java.util.zip.ZipOutputStream
import kotlin.math.sqrt

@Service
class FileAnalysisService(
    private val fileUploadRepository: FileUploadRepository
) {
    fun getAnalysisOptions(fileId: UUID): FileAnalysisOptionsDto {
        val file = fileUploadRepository.findById(fileId)
            .orElseThrow { Exception("File not found") }

        println("DEBUG: Processing file - ID: ${file.id}, Name: ${file.filename}, Type: ${file.fileType}, Size: ${file.fileData.size} bytes")

        return try {
            // Detect if it's a CSV
            if (file.fileType == "text/csv" || file.filename.endsWith(".csv")) {
                println("DEBUG: CSV file detected, processing as CSV")
                return processCsv(file)
            }
            // Process as Excel
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
    private fun processCsv(file: FileUpload): FileAnalysisOptionsDto {
        val inputStream = ByteArrayInputStream(file.fileData)
        val reader = BufferedReader(InputStreamReader(inputStream))

        val rows = reader.readLines()
        if (rows.isEmpty()) throw Exception("CSV file is empty")

        val columnHeaders = rows.first().split(",").map { it.trim() }

        return FileAnalysisOptionsDto(
            fileId = file.id,
            pivotTables = suggestPivotTables(columnHeaders, emptyMap()),
            visualizations = emptyList(),
            macros = emptyList()
        )
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
                    description = "Groups ${numericColumns[0]} based on ${categoricalColumns[0]}.",
                    rowFields = listOf(categoricalColumns[0]),
                    columnFields = listOf(),
                    valueFields = listOf(numericColumns[0]),
                    aggregationType = "SUM"
                )
            )
            if (numericColumns.isNotEmpty()) add(
                PivotTableOption(
                    title = "Top 10 ${categoricalColumns.firstOrNull() ?: "Items"}",
                    description = "Ranks the highest values in ${numericColumns[0]}.",
                    rowFields = listOf(categoricalColumns.firstOrNull() ?: ""),
                    columnFields = listOf(),
                    valueFields = listOf(numericColumns[0]),
                    aggregationType = "SUM"
                )
            )
        }
    }

    private fun suggestVisualizations(columns: List<String>, dataTypes: Map<String, String>): List<VisualizationOption> {
        val categoricalColumns = columns.filter { dataTypes[it] == "Text" }
        val numericColumns = columns.filter { dataTypes[it] == "Numeric" }
        val dateColumns = columns.filter { dataTypes[it] == "Date" }

        return buildList {
            // ✅ Bar Chart (Categorical vs. Numeric)
            if (categoricalColumns.isNotEmpty() && numericColumns.isNotEmpty()) {
                add(
                    VisualizationOption(
                        id = UUID.randomUUID(),
                        title = "Bar Chart - ${numericColumns[0]} by ${categoricalColumns[0]}",
                        description = "Displays ${numericColumns[0]} grouped by ${categoricalColumns[0]}.",
                        previewUrl = "/images/bar_chart.png",
                        chartType = "bar",
                        xAxis = categoricalColumns[0],
                        yAxis = numericColumns[0]
                    )
                )
            }

            // ✅ Line Graph (Time-series Data)
            if (numericColumns.isNotEmpty() && dateColumns.isNotEmpty()) {
                add(
                    VisualizationOption(
                        id = UUID.randomUUID(),
                        title = "Line Graph - ${numericColumns[0]} over Time",
                        description = "Shows trends of ${numericColumns[0]} over time.",
                        previewUrl = "/images/line_graph.png",
                        chartType = "line",
                        xAxis = dateColumns[0],
                        yAxis = numericColumns[0]
                    )
                )
            }

            // ✅ Pie Chart (Proportions of Categorical Data)
            if (categoricalColumns.isNotEmpty() && numericColumns.isNotEmpty()) {
                add(
                    VisualizationOption(
                        id = UUID.randomUUID(),
                        title = "Pie Chart - ${numericColumns[0]} distribution by ${categoricalColumns[0]}",
                        description = "Visualizes proportions of ${numericColumns[0]} among ${categoricalColumns[0]}.",
                        previewUrl = "/images/pie_chart.png",
                        chartType = "pie",
                        xAxis = categoricalColumns[0],
                        yAxis = numericColumns[0]
                    )
                )
            }

            // ✅ Scatter Plot (Correlation between Two Numeric Variables)
            if (numericColumns.size >= 2) {
                add(
                    VisualizationOption(
                        id = UUID.randomUUID(),
                        title = "Scatter Plot - ${numericColumns[0]} vs ${numericColumns[1]}",
                        description = "Shows the relationship between ${numericColumns[0]} and ${numericColumns[1]}.",
                        previewUrl = "/images/scatter_plot.png",
                        chartType = "scatter",
                        xAxis = numericColumns[0],
                        yAxis = numericColumns[1]
                    )
                )
            }

            // ✅ Histogram (Distribution of a Numeric Variable)
            if (numericColumns.isNotEmpty()) {
                add(
                    VisualizationOption(
                        id = UUID.randomUUID(),
                        title = "Histogram - Distribution of ${numericColumns[0]}",
                        description = "Displays the frequency distribution of ${numericColumns[0]}.",
                        previewUrl = "/images/histogram.png",
                        chartType = "histogram",
                        xAxis = numericColumns[0],
                        yAxis = "",
                    )
                )
            }

            // ✅ Heatmap (Correlations between Multiple Numeric Variables)
            if (numericColumns.size >= 2) {
                add(
                    VisualizationOption(
                        id = UUID.randomUUID(),
                        title = "Heatmap - Correlations",
                        description = "Shows correlation heatmap between numeric variables.",
                        previewUrl = "/images/heatmap.png",
                        chartType = "heatmap",
                        xAxis = numericColumns.joinToString(", "),
                        yAxis = "",
                    )
                )
            }
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
                    macroType = "Data Cleaning",
                    previewExample = formatPreviewExample(dataRows.take(5)) // ✅ Convert first 5 rows into a readable preview
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
                            macroType = "Data Analysis",
                            previewExample = formatPreviewExample(
                                dataRows.filter { it[col]?.toString()?.toDoubleOrNull() in outliers }.take(5)
                            ) // ✅ Convert first 5 outlier rows into a readable preview
                        )
                    )
                }
            }
        }

        return macros
    }
    private fun formatPreviewExample(rows: List<Map<String, Any>>): String {
        return rows.joinToString("\n") { row ->
            row.entries.joinToString(", ") { (key, value) -> "$key: $value" }
        }
    }

    fun processFileSelections(request: FileProcessingRequestDto): List<ProcessedFileDto> {
        val file = fileUploadRepository.findById(request.fileId)
            .orElseThrow { Exception("File not found") }

        val generatedFiles = mutableListOf<ProcessedFileDto>()

        // ✅ Generate pivot tables if selected
        if (request.pivotTables.isNotEmpty()) {
            val pivotFile = generatePivotTableFile(file, request.pivotTables)
            generatedFiles.add(pivotFile)
        }

        // ✅ Generate visualizations if selected
        if (request.visualizations.isNotEmpty()) {
            val visualizationFile = generateVisualizationFile(file, request.visualizations)
            generatedFiles.add(visualizationFile)
        }

        // ✅ Generate macros if selected
        if (request.macros.isNotEmpty()) {
            val macroFile = generateMacroFile(file, request.macros)
            generatedFiles.add(macroFile)
        }

        return generatedFiles
    }
    private fun generatePivotTableFile(file: FileUpload, selectedPivots: List<String>): ProcessedFileDto {
        val pivotWorkbook = WorkbookFactory.create(ByteArrayInputStream(file.fileData))
        val outputStream = ByteArrayOutputStream()

        val pivotSheet = pivotWorkbook.createSheet("PivotTables")
        val headerRow = pivotSheet.createRow(0)
        headerRow.createCell(0).setCellValue("Generated Pivot Tables")

        selectedPivots.forEachIndexed { index, pivot ->
            val row = pivotSheet.createRow(index + 1)
            row.createCell(0).setCellValue(pivot)
        }

        pivotWorkbook.write(outputStream)
        pivotWorkbook.close()

        return saveGeneratedFile(outputStream, "pivot_${file.filename}")
    }
    private fun generateVisualizationFile(file: FileUpload, selectedVisuals: List<String>): ProcessedFileDto {
        val outputStream = ByteArrayOutputStream()
        val zipOutputStream = ZipOutputStream(outputStream)

        selectedVisuals.forEach { visual ->
            val visualizationData = "Visualization Data for $visual"
            val zipEntry = ZipEntry("$visual.png")
            zipOutputStream.putNextEntry(zipEntry)
            zipOutputStream.write(visualizationData.toByteArray())
            zipOutputStream.closeEntry()
        }

        zipOutputStream.close()
        return saveGeneratedFile(outputStream, "visuals_${file.filename}.zip")
    }
    private fun generateMacroFile(file: FileUpload, selectedMacros: List<String>): ProcessedFileDto {
        val outputStream = ByteArrayOutputStream()
        val macroWorkbook = WorkbookFactory.create(ByteArrayInputStream(file.fileData))
        val macroSheet = macroWorkbook.createSheet("Macros")

        val headerRow = macroSheet.createRow(0)
        headerRow.createCell(0).setCellValue("Generated Macros")

        selectedMacros.forEachIndexed { index, macro ->
            val row = macroSheet.createRow(index + 1)
            row.createCell(0).setCellValue(macro)
        }

        macroWorkbook.write(outputStream)
        macroWorkbook.close()

        return saveGeneratedFile(outputStream, "macros_${file.filename}")
    }
    private fun saveGeneratedFile(outputStream: ByteArrayOutputStream, filename: String): ProcessedFileDto {
        val fileBytes = outputStream.toByteArray()
        val filePath = "/generated_files/$filename"

        File(filePath).writeBytes(fileBytes)

        return ProcessedFileDto(
            filename = filename,
            downloadUrl = "http://localhost:8080/api/files/download/$filename"
        )
    }

}
