package com.my.pivoteer.api.logs.model

import com.my.pivoteer.api.uploads.model.FileUpload
import com.my.pivoteer.api.user.model.User
import java.time.LocalDateTime
import java.util.*
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.Table

@Entity
@Table(name = "request_logs")
data class RequestLog(
    @Id val id: UUID = UUID.randomUUID(),

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    val user: User,

    @Column(name = "request_type")
    val requestType: String,

    val message: String,

    val success: Boolean,

    val timestamp: LocalDateTime = LocalDateTime.now(),

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "file_id")
    val file: FileUpload? = null
)
