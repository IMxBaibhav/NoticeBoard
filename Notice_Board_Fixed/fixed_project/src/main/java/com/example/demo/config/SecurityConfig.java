package com.example.demo.config;

import com.example.demo.security.JwtAuthenticationFilter;
import com.example.demo.security.JwtUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    private final JwtUtil jwtUtil;

    public SecurityConfig(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth

                // Public Endpoints
                .requestMatchers("/api/auth/login").permitAll()
                .requestMatchers("/uploads/**").permitAll()

                // Notice - Student can view only
                .requestMatchers("GET", "/api/notices/**").permitAll()

                // Notice - Admin/Moderator can create/delete
                .requestMatchers("POST", "/api/notices/**")
                    .hasAnyAuthority("ADMIN", "MODERATOR")
                .requestMatchers("DELETE", "/api/notices/**")
                    .hasAnyAuthority("ADMIN", "MODERATOR")
                .requestMatchers("PUT", "/api/notices/**")
                    .hasAnyAuthority("ADMIN", "MODERATOR")

                // Attachments upload/download
                .requestMatchers("POST", "/api/notices/*/attachments")
                    .hasAnyAuthority("ADMIN", "MODERATOR")
                .requestMatchers("GET", "/api/notices/*/attachments/**")
                    .permitAll()

                // Student Queries
                .requestMatchers("POST", "/api/queries") 
                    .hasAuthority("USER")
                .requestMatchers("GET", "/api/queries/mine")
                    .hasAuthority("USER")
                .requestMatchers("GET", "/api/queries/all")
                    .hasAnyAuthority("ADMIN", "MODERATOR")
                .requestMatchers("PUT", "/api/queries/*/reply")
                    .hasAnyAuthority("ADMIN", "MODERATOR")

                // Everything else requires auth
                .anyRequest().authenticated()
            )

            // Add JWT filter
            .addFilterBefore(new JwtAuthenticationFilter(jwtUtil),
                    UsernamePasswordAuthenticationFilter.class)

            .httpBasic(b -> b.disable());

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
