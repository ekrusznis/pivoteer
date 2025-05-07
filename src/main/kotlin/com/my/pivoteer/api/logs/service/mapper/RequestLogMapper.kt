package com.my.pivoteer.api.logs.service.mapper

import com.my.pivoteer.api.logs.model.RequestLog
import com.my.pivoteer.api.logs.model.dto.RequestLogDto

object RequestLogMapper {
    fun toDto(log: RequestLog): RequestLogDto {
        return RequestLogDto(
            id = log.id,
            requestType = log.requestType,
            message = log.message,
            success = log.success,
            timestamp = log.timestamp,
            fileName = log.file?.filename
        )
    }
}
