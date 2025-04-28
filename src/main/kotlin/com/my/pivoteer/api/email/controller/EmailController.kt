package com.my.pivoteer.api.email.controller

import com.my.pivoteer.api.email.model.EmailRequestDto
import com.my.pivoteer.api.email.service.EmailService
import org.springframework.web.bind.annotation.*
import org.springframework.http.ResponseEntity

@RestController
@RequestMapping("/api/email")
class EmailController(private val emailService: EmailService) {

    @PostMapping("/send")
    fun sendEmail(@RequestBody request: EmailRequestDto): ResponseEntity<String> {
        emailService.sendEmail(request)
        return ResponseEntity.ok("Email sent successfully")
    }
}
