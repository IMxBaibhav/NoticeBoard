package com.example.demo.controller;

import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AdminController {

    private final AuthService authService;
    public AdminController(AuthService authService) {
        this.authService = authService;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/users")
    public ResponseEntity<?> createUser(@RequestBody CreateUserRequest req) {
        try {
            Role role = Role.valueOf(req.role);
            User created = authService.createUser(req.username, req.password, req.fullName, req.email, role);
            if (created == null) return ResponseEntity.badRequest().body("User exists");
            return ResponseEntity.ok(created);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body("Invalid role");
        }
    }

    public static class CreateUserRequest {
        public String username, password, fullName, email, role;
    }
}
