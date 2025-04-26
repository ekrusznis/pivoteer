package com.my.pivoteer.api.support.service.mapper

import com.my.pivoteer.api.support.model.SupportTicket
import com.my.pivoteer.api.support.model.dto.SupportTicketDto

object SupportTicketMapper {
    fun toDto(ticket: SupportTicket): SupportTicketDto = SupportTicketDto(
        id = ticket.id!!,
        createdAt = ticket.createdAt,
        lastUpdated = ticket.lastUpdated,
        userId = ticket.userId,
        logId = ticket.logId,
        title = ticket.title,
        message = ticket.message,
        status = ticket.status
    )

    fun toEntity(dto: SupportTicketDto): SupportTicket = SupportTicket(
        id = dto.id,
        createdAt = dto.createdAt,
        lastUpdated = dto.lastUpdated,
        userId = dto.userId,
        logId = dto.logId,
        title = dto.title,
        message = dto.message,
        status = dto.status
    )
}
