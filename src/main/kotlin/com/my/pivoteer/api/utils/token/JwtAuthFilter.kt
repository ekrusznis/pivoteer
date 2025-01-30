package com.my.pivoteer.api.utils.token

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.web.filter.OncePerRequestFilter
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class JwtCookieFilter(
    private val jwtUtil: JwtUtil,
    private val userDetailsService: UserDetailsService
) : OncePerRequestFilter() {

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        // ✅ Extract JWT from HTTP-only Cookie
        val token = request.cookies?.firstOrNull { it.name == "jwt" }?.value

        if (token != null && jwtUtil.validateToken(token)) {
            val userId = jwtUtil.extractUserId(token) // ✅ Extract userId instead of email

            if (userId != null) {
                val userDetails: UserDetails = userDetailsService.loadUserByUsername(userId.toString())

                val authentication = UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.authorities
                )
                SecurityContextHolder.getContext().authentication = authentication
            }
        }

        filterChain.doFilter(request, response)
    }
}
