package com.example.demo.controller;

import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final AuthService authService;

    public AdminController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/create-user")
    public ResponseEntity<?> createUser(@RequestParam String username,
                                        @RequestParam String password,
                                        @RequestParam String fullName,
                                        @RequestParam String email,
                                        @RequestParam Role role) {

        User newUser = authService.createUser(username, password, fullName, email, role);

        if (newUser == null)
            return ResponseEntity.badRequest().body("User already exists");

        return ResponseEntity.ok(newUser);
    }
}
