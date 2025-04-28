package com.my.pivoteer.api.email.service

import com.my.pivoteer.api.email.model.EmailRequestDto
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.MimeMessageHelper
import org.springframework.stereotype.Service
import org.thymeleaf.TemplateEngine
import org.thymeleaf.context.Context
import javax.mail.internet.MimeMessage

@Service
class EmailService(
    private val mailSender: JavaMailSender,
    private val templateEngine: TemplateEngine
) {

    fun sendEmail(request: EmailRequestDto) {
        val mimeMessage: MimeMessage = mailSender.createMimeMessage()
        val helper = MimeMessageHelper(mimeMessage, "utf-8")

        val context = Context()
        context.setVariables(request.templateModel)

        val htmlContent = templateEngine.process(request.templateName, context)

        helper.setTo(request.to)
        helper.setSubject(request.subject)
        helper.setText(htmlContent, true)

        mailSender.send(mimeMessage)
    }
}
