package com.my.pivoteer.api.visualizations.model

data class VisualizationOptionDto(
    val chartType: String,
    val title: String,
    val description: String,
    val xAxis: String? = null,
    val yAxis: String? = null,
    val segments: String? = null,
    val values: String? = null,
    val previewUrl: String
)
