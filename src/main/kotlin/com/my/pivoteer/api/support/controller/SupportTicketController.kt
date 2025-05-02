package com.my.pivoteer.api.support.controller

import com.my.pivoteer.api.support.enum.SupportStatus
import com.my.pivoteer.api.support.model.dto.CreateSupportTicketRequestDto
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
    fun createTicket(@RequestBody request: CreateSupportTicketRequestDto): SupportTicketDto {
        return supportTicketService.createTicket(request)
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