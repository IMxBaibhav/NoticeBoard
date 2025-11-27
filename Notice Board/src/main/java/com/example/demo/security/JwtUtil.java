package com.example.demo.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // Replace with env var in production
    private final Key key = Keys.hmacShaKeyFor("change-this-secret-to-a-secure-long-env-value-please".getBytes());
    private final long expirationMs = 1000L * 60 * 60 * 24; // 24 hours

    public String generateToken(String username, String role) {
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(key)
                .compact();
    }

    public Jws<Claims> validate(String token) throws JwtException {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
    }

    public String getUsername(String token) {
        return validate(token).getBody().getSubject();
    }

    public String getRole(String token) {
        Object r = validate(token).getBody().get("role");
        return r == null ? null : r.toString();
    }
}
