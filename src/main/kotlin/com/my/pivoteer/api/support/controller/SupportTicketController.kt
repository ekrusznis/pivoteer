package com.my.pivoteer.api.support.controller

import com.my.pivoteer.api.support.enum.SupportStatus
import com.my.pivoteer.api.support.model.dto.SupportTicketDto
import com.my.pivoteer.api.support.service.SupportTicketService
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/api/support")
class SupportTicketController(
    private val supportTicketService: SupportTicketService
) {

    @PostMapping
    fun createTicket(@RequestBody request: CreateSupportTicketRequest): SupportTicketDto {
        return supportTicketService.createTicket(
            userId = request.userId,
            logId = request.logId,
            title = request.title,
            message = request.message,
            userEmail = request.userEmail
        )
    }

    @GetMapping
    fun getAllTickets(): List<SupportTicketDto> {
        return supportTicketService.getAllTickets()
    }

    @GetMapping("/{userId}")
    fun getTicketsByUser(@PathVariable userId: UUID): List<SupportTicketDto> {
        return supportTicketService.getTicketsByUser(userId)
    }

    @PutMapping("/{ticketId}/status")
    fun updateStatus(@PathVariable ticketId: UUID, @RequestParam status: SupportStatus): SupportTicketDto {
        return supportTicketService.updateTicketStatus(ticketId, status)
    }
}

data class CreateSupportTicketRequest(
    val userId: UUID,
    val logId: UUID?,
    val title: String,
    val message: String,
    val userEmail: String
)
