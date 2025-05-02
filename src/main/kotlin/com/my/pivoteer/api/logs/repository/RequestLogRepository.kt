package com.my.pivoteer.api.logs.repository

import com.my.pivoteer.api.logs.model.RequestLog
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import java.util.*

interface RequestLogRepository : JpaRepository<RequestLog, UUID>, JpaSpecificationExecutor<RequestLog>
