package com.my.pivoteer.api.history.repository

import com.my.pivoteer.api.history.model.RequestLog
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface RequestLogRepository : JpaRepository<RequestLog, UUID>{
    fun findAllByUserId(userId: UUID): List<RequestLog>
}
