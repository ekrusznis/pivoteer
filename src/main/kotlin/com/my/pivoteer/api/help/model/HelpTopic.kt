package com.my.pivoteer.api.help.model

import java.util.*
import javax.persistence.CollectionTable
import javax.persistence.Column
import javax.persistence.ElementCollection
import javax.persistence.Embeddable
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.Table

@Entity
@Table(name = "help_topics")
data class HelpTopic(
    @Id
    val id: UUID = UUID.randomUUID(),

    @Column(nullable = false)
    val title: String,

    @Column(columnDefinition = "TEXT", nullable = false)
    val description: String, // HTML content

    @Column(name = "created_date", nullable = false)
    val createdDate: Date = Date(),

    @ElementCollection
    @CollectionTable(name = "help_attachments", joinColumns = [JoinColumn(name = "help_topic_id")])
    val attachments: List<Attachment> = emptyList()
)

@Embeddable
data class Attachment(
    val index: Int,
    val fileUrl: String
)
