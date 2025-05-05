package com.my.pivoteer.api.uploads.model

import java.util.*
import javax.persistence.*

@Entity
@Table(name = "file_data")
data class FlatFileData(
    @Id
    val id: UUID = UUID.randomUUID(),

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "file_id", nullable = false)
    val fileId: FileUpload,

    @Column
    @Lob
    val dataObject: String,

    @Column
    val dataType: String
)