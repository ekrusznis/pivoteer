package com.my.pivoteer.api.user.service

import com.my.pivoteer.api.user.model.Subscription
import com.my.pivoteer.api.user.repository.SubscriptionRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class SubscriptionService(private val subscriptionRepository: SubscriptionRepository) {

    fun getSubscriptionByUserId(userId: UUID): Subscription? {
        return subscriptionRepository.findByUserId(userId)
    }

    fun hasAddon(userId: UUID, addonName: String): Boolean {
        val subscription = getSubscriptionByUserId(userId) ?: return false
        return subscription.addons.any { it.name == addonName }
    }
}