package com.my.pivoteer.api.user.model

import com.my.pivoteer.api.user.enum.SubscriptionStatus
import java.util.*
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.EnumType
import javax.persistence.Enumerated
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "users")
data class User(
    @Id
    val id: UUID = UUID.randomUUID(),

    @Column(nullable = false)
    val firstName: String,

    @Column(nullable = false)
    val lastName: String,

    @Column(unique = true, nullable = false)
    val email: String,

    @Column(nullable = false)
    val password: String,

    @Column(nullable = false)
    val birthDate: Date,

    @Column(nullable = true)
    val subscriptionId: String? = null, // Stripe or PayPal subscription ID

    @Enumerated(EnumType.STRING)
    @Column(nullable = true)
    val subscriptionStatus: SubscriptionStatus? = null, // Active, Canceled, Trial, etc.

    @Column(nullable = true)
    val subscriptionExpiry: Date? = null,

    @Column(nullable = false)
    val createdAt: Date = Date(),

    @Column(nullable = false)
    val updatedAt: Date = Date()
)
