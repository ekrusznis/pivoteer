package com.my.pivoteer.api.logs.controller

import com.my.pivoteer.api.logs.model.dto.RequestLogDto
import com.my.pivoteer.api.logs.service.RequestLogService
import com.my.pivoteer.api.utils.response.ApiResponse
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDateTime
import java.util.*

@RestController
@RequestMapping("/api/request-logs")
class RequestLogController(private val requestLogService: RequestLogService) {

    @GetMapping("/{userId}")
    fun getLogs(
        @PathVariable userId: UUID,
        @RequestParam(required = false) keyword: String?,
        @RequestParam(required = false) type: String?,
        @RequestParam(required = false) success: Boolean?,
        @RequestParam(required = false) from: LocalDateTime?,
        @RequestParam(required = false) to: LocalDateTime?,
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int
    ): ApiResponse<Page<RequestLogDto>> {
        val pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "timestamp"))
        val result = requestLogService.getLogsByUserWithFilters(userId, keyword, type, success, from, to, pageable)
        return ApiResponse(true, "Logs fetched", result)
    }

    @PostMapping("/{userId}/createTicketFromRequestLog")
    fun createTicketFromRequestLog(
        @PathVariable userId: UUID,
        @RequestParam logId: UUID
    ): ApiResponse<Map<String, UUID>> {
        val ticket = requestLogService.createSupportTicketFromLog(userId, logId)
            ?: return ApiResponse(false, "Unable to create support ticket from log")

        return ApiResponse(true, "Support ticket created from request log", mapOf("ticketId" to ticket.id))
    }

}
