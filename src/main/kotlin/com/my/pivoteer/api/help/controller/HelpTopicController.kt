package com.my.pivoteer.api.help.controller

import com.my.pivoteer.api.help.model.dto.HelpTopicDto
import com.my.pivoteer.api.help.service.HelpTopicService
import com.my.pivoteer.api.utils.response.ApiResponse
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/api/help-topics")
class HelpTopicController(
    private val helpTopicService: HelpTopicService
) {

    @GetMapping("/titles")
    fun getAllTitles(): ApiResponse<List<Map<String, Any>>> {
        val titles = helpTopicService.getAllTopics().map {
            mapOf("id" to it.id, "title" to it.title)
        }
        return ApiResponse(true, "Help topic titles retrieved", titles)
    }

    @GetMapping("/{id}")
    fun getTopicById(@PathVariable id: UUID): ApiResponse<HelpTopicDto> {
        val topic = helpTopicService.getTopicById(id)
            ?: return ApiResponse(false, "Help topic not found")
        return ApiResponse(true, "Help topic retrieved", topic)
    }

    @PostMapping
    fun createTopic(@RequestBody dto: HelpTopicDto): ApiResponse<HelpTopicDto> {
        val saved = helpTopicService.saveTopic(dto)
        return ApiResponse(true, "Help topic created", saved)
    }

    @PutMapping("/{id}")
    fun updateTopic(@PathVariable id: UUID, @RequestBody dto: HelpTopicDto): ApiResponse<HelpTopicDto> {
        if (id != dto.id) {
            return ApiResponse(false, "ID mismatch")
        }

        val updated = helpTopicService.saveTopic(dto)
        return ApiResponse(true, "Help topic updated", updated)
    }
}
