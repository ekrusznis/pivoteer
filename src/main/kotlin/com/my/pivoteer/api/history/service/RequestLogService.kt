package com.my.pivoteer.api.history.service

import com.my.pivoteer.api.history.enum.RequestType
import com.my.pivoteer.api.history.model.RequestLog
import com.my.pivoteer.api.history.model.dto.RequestLogDto
import com.my.pivoteer.api.history.repository.RequestLogRepository
import com.my.pivoteer.api.history.service.mapper.RequestLogMapper
import org.springframework.stereotype.Service
import java.util.*

@Service
class RequestLogService(private val requestLogRepository: RequestLogRepository) {

    fun saveLog(userId: UUID, fileId: UUID?, requestType: RequestType, success: Boolean, message: String) {
        val log = RequestLog(
            userId = userId,
            fileId = fileId,
            requestType = requestType,
            success = success,
            message = message
        )
        requestLogRepository.save(log)
    }

    fun getLogsByUser(userId: UUID): List<RequestLogDto> {
        return requestLogRepository.findAllByUserId(userId).map { RequestLogMapper.toDto(it) }
    }

    fun getAllLogs(): List<RequestLogDto> {
        return requestLogRepository.findAll().map { RequestLogMapper.toDto(it) }
    }

}
