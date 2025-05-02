package com.my.pivoteer.api.help.service

import com.my.pivoteer.api.help.model.dto.HelpTopicDto
import com.my.pivoteer.api.help.repository.HelpTopicRepository
import com.my.pivoteer.api.help.service.mapper.HelpTopicMapper
import org.springframework.stereotype.Service
import java.util.*

@Service
class HelpTopicService(private val helpTopicRepository: HelpTopicRepository) {

    fun getAllTopics(): List<HelpTopicDto> =
        helpTopicRepository.findAll().map { HelpTopicMapper.toDto(it) }

    fun getTopicById(id: UUID): HelpTopicDto? =
        helpTopicRepository.findById(id).map { HelpTopicMapper.toDto(it) }.orElse(null)

    fun saveTopic(dto: HelpTopicDto): HelpTopicDto {
        val saved = helpTopicRepository.save(HelpTopicMapper.toEntity(dto))
        return HelpTopicMapper.toDto(saved)
    }
}
