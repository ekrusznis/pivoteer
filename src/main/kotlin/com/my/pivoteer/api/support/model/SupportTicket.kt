package com.my.pivoteer.api.support.model

import com.my.pivoteer.api.support.enum.SupportStatus
import java.time.LocalDateTime
import java.util.*
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.EnumType
import javax.persistence.Enumerated
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "support_tickets")
data class SupportTicket(
    @Id
    @GeneratedValue
    val id: UUID? = null,

    val createdAt: LocalDateTime = LocalDateTime.now(),
    var lastUpdated: LocalDateTime? = null,

    val userId: UUID,

    val logId: UUID? = null, // Nullable

    val title: String,

    @Column(columnDefinition = "TEXT")
    val message: String,

    @Enumerated(EnumType.STRING)
    var status: SupportStatus = SupportStatus.OPEN // Default to OPEN on creation

)
