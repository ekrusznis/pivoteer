package com.my.pivoteer.api.uploads.service

import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate

@Service
class TranslationService(
    @Value("\${openai.api.key}") private val apiKey: String,
    private val restTemplate: RestTemplate
) {
    fun translateText(text: String, targetLanguage: String): String {
        val headers = HttpHeaders().apply {
            contentType = MediaType.APPLICATION_JSON
            setBearerAuth(apiKey)
        }

        val body = mapOf(
            "model" to "gpt-4",
            "messages" to listOf(
                mapOf("role" to "system", "content" to "You are a translation assistant."),
                mapOf("role" to "user", "content" to "Translate the following text into $targetLanguage:\n$text")
            )
        )

        val request = HttpEntity(body, headers)

        val response = restTemplate.postForEntity(
            "https://api.openai.com/v1/chat/completions",
            request,
            Map::class.java
        )

        val content = ((response.body?.get("choices") as List<*>)[0] as Map<*, *>)["message"] as Map<*, *>
        return content["content"].toString().trim()
    }

}
