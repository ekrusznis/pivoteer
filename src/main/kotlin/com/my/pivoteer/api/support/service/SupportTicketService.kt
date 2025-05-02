package com.my.pivoteer.api.support.service

import com.my.pivoteer.api.email.model.EmailRequestDto
import com.my.pivoteer.api.email.service.EmailService
import com.my.pivoteer.api.support.enum.SupportStatus
import com.my.pivoteer.api.support.model.SupportTicket
import com.my.pivoteer.api.support.model.dto.CreateSupportTicketRequestDto
import com.my.pivoteer.api.support.model.dto.SupportTicketDto
import com.my.pivoteer.api.support.repository.SupportTicketRepository
import com.my.pivoteer.api.support.service.mapper.SupportTicketMapper
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.util.*

@Service
class SupportTicketService(
    private val supportTicketRepository: SupportTicketRepository,
    private val emailService: EmailService
) {

    fun createTicket(request: CreateSupportTicketRequestDto): SupportTicketDto {
        val ticket = SupportTicket(
            userId = request.userId,
            logId = request.logId,
            title = request.title,
            message = request.message
        )

        val savedTicket = supportTicketRepository.save(ticket)

        // 🔵 1. Email to Support Team
        val supportEmailRequest = EmailRequestDto(
            to = "support@mypivoteer.com",
            subject = "New Support Ticket Submitted",
            templateName = "email/support_ticket", // Template for Support Team
            templateModel = mapOf(
                "ticketId" to savedTicket.id.toString(),
                "title" to request.title,
                "message" to request.message
            )
        )
        emailService.sendEmail(supportEmailRequest)

        // 🔵 2. Email to User (Acknowledgment)
        val userEmailRequest = EmailRequestDto(
            to = request.userEmail,
            subject = "Your Support Ticket has been Received",
            templateName = "email/user_ticket_acknowledgement", // New template for Users
            templateModel = mapOf(
                "ticketId" to savedTicket.id.toString(),
                "userName" to "Customer", // (Optional, if you have a username you can pass it too)
                "title" to request.title,
                "message" to request.message
            )
        )
        emailService.sendEmail(userEmailRequest)

        return SupportTicketMapper.toDto(savedTicket)
    }


    fun getAllTickets(): List<SupportTicketDto> {
        return supportTicketRepository.findAll().map { SupportTicketMapper.toDto(it) }
    }

    fun getTicketsByUser(userId: UUID): List<SupportTicketDto> {
        return supportTicketRepository.findAllByUserId(userId).map { SupportTicketMapper.toDto(it) }
    }

    fun updateTicketStatus(ticketId: UUID, newStatus: SupportStatus): SupportTicketDto {
        val ticket = supportTicketRepository.findById(ticketId)
            .orElseThrow { RuntimeException("Ticket not found") }

        ticket.status = newStatus
        ticket.lastUpdated = LocalDateTime.now()
        val updated = supportTicketRepository.save(ticket)

        return SupportTicketMapper.toDto(updated)
    }
}
