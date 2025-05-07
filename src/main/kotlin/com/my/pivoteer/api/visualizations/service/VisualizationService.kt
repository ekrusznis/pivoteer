package com.my.pivoteer.api.visualizations.service

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.KotlinModule
import com.my.pivoteer.api.macro.model.dto.ParsedFileData
import com.my.pivoteer.api.uploads.service.FileUploadService
import com.my.pivoteer.api.visualizations.model.VisualizationOptionDto
import org.springframework.stereotype.Service

@Service
class VisualizationService(
    private val fileUploadService: FileUploadService
) {

    fun suggestVisualizationOptions(data: String): List<VisualizationOptionDto> {

        val parsedData = parseFileData(data)

        val availableColumns = parsedData.columns
        val sampleRows = parsedData.rows.take(5)

        val options = mutableListOf<VisualizationOptionDto>()

        // Analyze column types by inspecting first few rows
        val columnTypes = analyzeColumnTypes(sampleRows)

        val textColumns = columnTypes.filterValues { it == "text" }.keys.toList()
        val numericColumns = columnTypes.filterValues { it == "numeric" }.keys.toList()
        val dateColumns = columnTypes.filterValues { it == "date" }.keys.toList()

        if (textColumns.isNotEmpty() && numericColumns.isNotEmpty()) {
            options.add(
                VisualizationOptionDto(
                    chartType = "bar",
                    title = "Sales by ${textColumns[0]}",
                    description = "Displays total ${numericColumns[0]} grouped by ${textColumns[0]}.",
                    xAxis = textColumns[0],
                    yAxis = numericColumns[0],
                    previewUrl = "https://mypivoteer.com/assets/bar_chart.png"
                )
            )
        }

        if (dateColumns.isNotEmpty() && numericColumns.isNotEmpty()) {
            options.add(
                VisualizationOptionDto(
                    chartType = "line",
                    title = "Trend of ${numericColumns[0]} over ${dateColumns[0]}",
                    description = "Shows how ${numericColumns[0]} changes over time (${dateColumns[0]}).",
                    xAxis = dateColumns[0],
                    yAxis = numericColumns[0],
                    previewUrl = "https://mypivoteer.com/assets/line_chart.png"
                )
            )
        }

        if (textColumns.isNotEmpty() && numericColumns.isNotEmpty()) {
            options.add(
                VisualizationOptionDto(
                    chartType = "pie",
                    title = "Distribution by ${textColumns[0]}",
                    description = "Shows share of each ${textColumns[0]} category.",
                    segments = textColumns[0],
                    values = numericColumns[0],
                    previewUrl = "https://mypivoteer.com/assets/pie_chart.png"
                )
            )
        }

        if (numericColumns.size >= 2) {
            options.add(
                VisualizationOptionDto(
                    chartType = "scatter",
                    title = "${numericColumns[0]} vs ${numericColumns[1]}",
                    description = "Scatter plot comparing ${numericColumns[0]} and ${numericColumns[1]}.",
                    xAxis = numericColumns[0],
                    yAxis = numericColumns[1],
                    previewUrl = "https://mypivoteer.com/assets/scatter_plot.png"
                )
            )
        }
        if (textColumns.size >= 2 && numericColumns.isNotEmpty()) {
            // Stacked Bar Chart
            options.add(
                VisualizationOptionDto(
                    chartType = "stackedBar",
                    title = "${numericColumns[0]} by ${textColumns[0]} and ${textColumns[1]}",
                    description = "Shows ${numericColumns[0]} broken down by ${textColumns[0]} and ${textColumns[1]}.",
                    xAxis = textColumns[0],
                    yAxis = numericColumns[0],
                    previewUrl = "https://mypivoteer.com/assets/stacked_bar_chart.png"
                )
            )
        }
        if (numericColumns.isNotEmpty()) {
            options.add(
                VisualizationOptionDto(
                    chartType = "histogram",
                    title = "Distribution of ${numericColumns[0]}",
                    description = "Shows how ${numericColumns[0]} values are distributed across ranges.",
                    xAxis = numericColumns[0],
                    yAxis = "Count",
                    previewUrl = "https://mypivoteer.com/assets/histogram_chart.png"
                )
            )
        }

        return options
    }
    fun parseFileData(jsonData: String): ParsedFileData {
        val objectMapper = ObjectMapper()
            .registerModule(KotlinModule.Builder().build())
            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)

        val typeRef = object : TypeReference<ParsedFileData>() {}
        return objectMapper.readValue(jsonData, typeRef)
    }

    private fun analyzeColumnTypes(rows: List<Map<String, String>>): Map<String, String> {
        val columnTypes = mutableMapOf<String, String>()

        if (rows.isEmpty()) return columnTypes

        val firstRow = rows.first()

        for ((column, value) in firstRow) {
            columnTypes[column] = when {
                value.isNullOrBlank() -> "text"
                value.toDoubleOrNull() != null -> "numeric"
                value.matches(Regex("\\d{4}-\\d{2}-\\d{2}")) -> "date" // basic yyyy-mm-dd
                else -> "text"
            }
        }
        return columnTypes
    }

}
