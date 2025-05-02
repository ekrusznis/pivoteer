package com.my.pivoteer.api.logs.service

import com.my.pivoteer.api.logs.model.RequestLog
import com.my.pivoteer.api.logs.model.dto.RequestLogDto
import com.my.pivoteer.api.logs.repository.RequestLogRepository
import com.my.pivoteer.api.logs.service.mapper.RequestLogMapper
import com.my.pivoteer.api.support.model.dto.CreateSupportTicketRequestDto
import com.my.pivoteer.api.support.model.dto.SupportTicketDto
import com.my.pivoteer.api.support.service.SupportTicketService
import com.my.pivoteer.api.user.model.User
import com.my.pivoteer.api.user.service.UserService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.domain.Specification
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.util.*
import javax.persistence.criteria.Predicate

@Service
class RequestLogService(
    private val requestLogRepository: RequestLogRepository,
    private val userService: UserService,
    private val supportTicketService: SupportTicketService
) {
    fun getLogsByUserWithFilters(
        userId: UUID,
        keyword: String?,
        type: String?,
        success: Boolean?,
        from: LocalDateTime?,
        to: LocalDateTime?,
        pageable: Pageable
    ): Page<RequestLogDto> {
        val spec = Specification.where<RequestLog> { root, _, cb ->
            val predicates = mutableListOf<Predicate>()
            predicates += cb.equal(root.get<User>("user").get<UUID>("id"), userId)

            if (!keyword.isNullOrBlank()) {
                predicates += cb.like(cb.lower(root.get("message")), "%${keyword.lowercase()}%")
            }
            if (!type.isNullOrBlank()) {
                predicates += cb.equal(root.get<String>("requestType"), type)
            }
            if (success != null) {
                predicates += cb.equal(root.get<Boolean>("success"), success)
            }
            if (from != null) {
                predicates += cb.greaterThanOrEqualTo(root.get("timestamp"), from)
            }
            if (to != null) {
                predicates += cb.lessThanOrEqualTo(root.get("timestamp"), to)
            }

            cb.and(*predicates.toTypedArray())
        }

        return requestLogRepository.findAll(spec, pageable)
            .map { RequestLogMapper.toDto(it) }
    }

    fun createSupportTicketFromLog(userId: UUID, logId: UUID): SupportTicketDto? {
        val user = userService.findUserById(userId) ?: return null
        val log = requestLogRepository.findById(logId).orElse(null) ?: return null

        val ticketDto = CreateSupportTicketRequestDto(
            userId = user.id,
            logId = log.id,
            title = "Issue with request: ${log.requestType}",
            message = buildString {
                appendLine("A support ticket was created from the following request log:")
                appendLine()
                appendLine("Type: ${log.requestType}")
                appendLine("Message: ${log.message}")
                appendLine("Success: ${log.success}")
                appendLine("Timestamp: ${log.timestamp}")
                appendLine()
                appendLine("Please add more details if needed.")
            },
            userEmail = user.email
        )

        return supportTicketService.createTicket(ticketDto)
    }

}
