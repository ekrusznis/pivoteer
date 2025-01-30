package com.my.pivoteer.api.utils.security

import com.my.pivoteer.api.user.repository.UserRepository
import com.my.pivoteer.api.utils.token.JwtCookieFilter
import com.my.pivoteer.api.utils.token.JwtUtil
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.util.matcher.AntPathRequestMatcher
import java.util.*

@Configuration
class SecurityConfig(
    private val jwtUtil: JwtUtil,
    private val userRepository: UserRepository
) {

    @Bean
    fun userDetailsService(): UserDetailsService {
        return UserDetailsService { userId -> // ✅ Now loads user by userId
            val user = userRepository.findById(UUID.fromString(userId))
                .orElseThrow { UsernameNotFoundException("User not found with ID: $userId") }

            User.builder()
                .username(user.id.toString()) // ✅ Use UUID as username
                .password(user.password) // ✅ Stored as hashed password
                .roles("USER")
                .build()
        }
    }

    @Bean
    fun securityFilterChain(http: HttpSecurity, userDetailsService: UserDetailsService): SecurityFilterChain {
        http
            .cors().and()
            .csrf().disable()
            .authorizeHttpRequests { auth ->
                auth.requestMatchers(AntPathRequestMatcher("/api/auth/**")).permitAll()
                auth.requestMatchers(AntPathRequestMatcher("/api/files/**")).authenticated()
                auth.anyRequest().authenticated()
            }
            .addFilterBefore(
                JwtCookieFilter(jwtUtil, userDetailsService),
                org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter::class.java
            )

        return http.build()
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }
}
