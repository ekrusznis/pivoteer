package com.my.pivoteer.api.history.controller

import com.my.pivoteer.api.history.model.dto.RequestLogDto
import com.my.pivoteer.api.history.service.RequestLogService
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/api/admin/logs")
class RequestLogController(private val requestLogService: RequestLogService) {

    @GetMapping
    fun getAllLogs(): List<RequestLogDto> {
        return requestLogService.getAllLogs()
    }

    @GetMapping("/{userId}")
    fun getLogsByUser(@PathVariable userId: UUID): List<RequestLogDto> {
        return requestLogService.getLogsByUser(userId)
    }

}