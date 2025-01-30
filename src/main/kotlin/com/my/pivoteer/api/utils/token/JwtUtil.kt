package com.my.pivoteer.api.utils.token

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.util.*

@Component
class JwtUtil(@Value("\${jwt.secret}") private val secret: String) {

    private val expirationMs: Long = 86400000 // 1 day

    fun generateToken(userId: UUID): String { // ✅ Generate token based on userId
        val claims: Claims = Jwts.claims().setSubject(userId.toString()) // ✅ Store userId as subject
        val now = Date()
        val expiryDate = Date(now.time + expirationMs)

        return Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(now)
            .setExpiration(expiryDate)
            .signWith(SignatureAlgorithm.HS256, secret.toByteArray())
            .compact()
    }

    fun extractUserId(token: String): UUID? { // ✅ Extract userId from token
        return try {
            val claims = Jwts.parser()
                .setSigningKey(secret.toByteArray())
                .parseClaimsJws(token)
                .body

            UUID.fromString(claims.subject) // ✅ Convert back to UUID
        } catch (e: Exception) {
            null
        }
    }

    fun validateToken(token: String): Boolean {
        return try {
            val claims = Jwts.parser()
                .setSigningKey(secret.toByteArray())
                .parseClaimsJws(token)
                .body

            !claims.expiration.before(Date()) // ✅ Ensure token is still valid
        } catch (e: Exception) {
            false
        }
    }
}
