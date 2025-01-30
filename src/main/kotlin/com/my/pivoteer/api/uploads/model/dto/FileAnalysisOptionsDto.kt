package com.my.pivoteer.api.uploads.model.dto

import java.util.UUID

data class PivotTableOption(
    val title: String? = "",               // ✅ More descriptive name for the Pivot Table
    val description: String?  = "",         // ✅ Explanation of what this pivot does
    val rowFields: List<String> = emptyList(),     // ✅ Fields used as row groups
    val columnFields: List<String> = emptyList(),  // ✅ Fields used as column groups (if applicable)
    val valueFields: List<String> = emptyList(),   // ✅ Numeric fields being summarized
    val aggregationType: String? = ""   // ✅ Sum, Count, Average, etc.
)

data class VisualizationOption(
    val id: UUID = UUID.randomUUID(), // ✅ Unique ID for frontend handling
    val title: String? = "",               // ✅ Name of the visualization
    val description: String? = "",         // ✅ Dynamic explanation of what it represents
    val previewUrl: String? = "",          // ✅ URL to a preview image of the visualization
    val xAxis: String? = "",              // ✅ Column used for X-axis (if applicable)
    val yAxis: String? = "",              // ✅ Column used for Y-axis (if applicable)
    val chartType: String? = ""            // ✅ Type of chart (e.g., "Bar Chart", "Pie Chart")
)

data class MacroOption(
    val title: String? = "",                 // ✅ Macro Name
    val description: String? = "",            // ✅ Dynamic Description
    val affectedColumns: List<String> = emptyList(),  // ✅ Columns this macro will impact
    val macroType: String? = "",              // ✅ Macro category (e.g., "Data Cleaning", "Formatting")
    val previewExample: String? = null  // ✅ (Optional) Example preview image
)

data class FileAnalysisOptionsDto(
    val fileId: UUID,
    val pivotTables: List<PivotTableOption>,         // ✅ Pivot Table objects
    val visualizations: List<VisualizationOption>,  // ✅ Visualization objects
    val macros: List<MacroOption>                   // ✅ Macro objects
)
