package com.example.demo.service;

import com.example.demo.dto.AuthResponse;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository repo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository repo, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse login(String username, String password) {
        User u = repo.findByUsername(username).orElse(null);
        if (u == null) return null;

        if (!passwordEncoder.matches(password, u.getPassword())) return null;

        String token = jwtUtil.generateToken(u.getUsername(), u.getRole());

        return new AuthResponse(
                token,
                u.getUsername(),
                u.getRole()
        );
    }

    // Admin creates users
    public User createUser(String username, String rawPassword, String fullName, String email, String role) {

        if (repo.findByUsername(username).isPresent()) {
            return null; // username already exists
        }

        User u = User.builder()
                .username(username)
                .password(passwordEncoder.encode(rawPassword))
                .fullName(fullName)
                .email(email)
                .role(role)
                .build();

        return repo.save(u);
    }
}
