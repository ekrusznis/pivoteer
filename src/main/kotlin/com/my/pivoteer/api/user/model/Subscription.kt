package com.my.pivoteer.api.user.model

import com.my.pivoteer.api.user.enum.AddonType
import com.my.pivoteer.api.user.enum.SubscriptionStatus
import com.my.pivoteer.api.user.enum.SubscriptionType
import java.util.*
import javax.persistence.CollectionTable
import javax.persistence.Column
import javax.persistence.ElementCollection
import javax.persistence.Entity
import javax.persistence.EnumType
import javax.persistence.Enumerated
import javax.persistence.FetchType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.Table

@Entity
@Table(name = "subscriptions")
data class Subscription(
    @Id
    val id: UUID = UUID.randomUUID(),

    @Column(nullable = false)
    val userId: UUID, // link to User.id

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    val subscriptionType: SubscriptionType,

    @Column(nullable = false)
    val startDate: Date = Date(),

    @Column(nullable = true)
    val nextBillingDate: Date? = null,

    @Column(nullable = true)
    val endDate: Date? = null, // If cancelled

    @Column(nullable = false)
    val isFreeTrial: Boolean = false,

    @Column(nullable = true)
    val stripeSubscriptionId: String? = null, // Stripe subscription ID

    @Column(nullable = true)
    val stripeCustomerId: String? = null, // Stripe customer ID

    @Column(nullable = true)
    val stripeRefreshToken: String? = null, // If needed for API refreshes

    @Column(nullable = true)
    val currentPeriodEnd: Date? = null, // from Stripe subscription (when it renews)

    @Enumerated(EnumType.STRING)
    @Column(nullable = true)
    val status: SubscriptionStatus? = null,

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "subscription_addons", joinColumns = [JoinColumn(name = "subscription_id")])
    @Column(name = "addon")
    val addons: Set<AddonType> = emptySet(),

    @Column(nullable = false)
    val createdAt: Date = Date(),

    @Column(nullable = false)
    val updatedAt: Date = Date()
)
