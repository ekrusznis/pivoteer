package com.my.pivoteer.api.macro.model

import com.my.pivoteer.api.uploads.model.FileUpload
import com.my.pivoteer.api.user.model.User
import java.util.*
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.Table

@Entity
@Table(name = "macros")
data class Macro(
    @Id
    val id: UUID = UUID.randomUUID(),

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    val user: User,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "file_id", nullable = false)
    val file: FileUpload,

    @Column(nullable = false)
    val macroName: String,

    @Column(nullable = false, length = 5000)
    val macroDefinition: String, // JSON defining macro steps

    @Column(nullable = false)
    val createdAt: Date = Date()
)
