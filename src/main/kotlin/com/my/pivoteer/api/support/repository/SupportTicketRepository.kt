package com.my.pivoteer.api.support.repository

import com.my.pivoteer.api.support.model.SupportTicket
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface SupportTicketRepository : JpaRepository<SupportTicket, UUID> {
    fun findAllByUserId(userId: UUID): List<SupportTicket>
}
