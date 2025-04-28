package com.my.pivoteer.api.history.service.mapper

import com.my.pivoteer.api.history.model.RequestLog
import com.my.pivoteer.api.history.model.dto.RequestLogDto

object RequestLogMapper {
    fun toDto(log: RequestLog): RequestLogDto = RequestLogDto(
        id = log.id!!,
        timestamp = log.timestamp,
        userId = log.userId,
        fileId = log.fileId,
        requestType = log.requestType,
        success = log.success,
        message = log.message
    )

    fun toEntity(dto: RequestLogDto): RequestLog = RequestLog(
        id = dto.id,
        timestamp = dto.timestamp,
        userId = dto.userId,
        fileId = dto.fileId,
        requestType = dto.requestType,
        success = dto.success,
        message = dto.message
    )
}
