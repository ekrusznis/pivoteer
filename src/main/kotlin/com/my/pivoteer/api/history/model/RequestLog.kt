package com.my.pivoteer.api.history.model

import com.my.pivoteer.api.history.enum.RequestType
import java.time.LocalDateTime
import java.util.*
import javax.persistence.Entity
import javax.persistence.EnumType
import javax.persistence.Enumerated
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "request_logs")
data class RequestLog(
    @Id
    @GeneratedValue
    val id: UUID? = null,

    val timestamp: LocalDateTime = LocalDateTime.now(),

    val userId: UUID,

    val fileId: UUID? = null,

    @Enumerated(EnumType.STRING)
    val requestType: RequestType,

    val success: Boolean,

    val message: String
)
