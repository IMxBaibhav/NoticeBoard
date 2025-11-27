package com.example.demo.controller;

import com.example.demo.entity.Query;
import com.example.demo.service.QueryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/queries")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class QueryController {

    private final QueryService queryService;

    public QueryController(QueryService queryService) {
        this.queryService = queryService;
    }

    // Student creates a query (must be logged in)
    @PostMapping
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<?> createQuery(@RequestBody CreateQueryRequest req, Authentication authentication) {
        String username = authentication.getName();
        Query q = new Query(req.subject, req.message, username, req.studentName, req.studentEmail);
        Query saved = queryService.createQuery(q);
        return ResponseEntity.ok(saved);
    }

    // Student fetch own queries
    @GetMapping("/mine")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<List<Query>> myQueries(Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(queryService.getQueriesForStudent(username));
    }

    // Admin/Moderator: get all queries
    @GetMapping("/all")
    @PreAuthorize("hasAnyAuthority('ADMIN','MODERATOR')")
    public ResponseEntity<List<Query>> allQueries() {
        return ResponseEntity.ok(queryService.getAllQueries());
    }

    // Admin/Moderator: reply to query
    @PutMapping("/{id}/reply")
    @PreAuthorize("hasAnyAuthority('ADMIN','MODERATOR')")
    public ResponseEntity<?> reply(@PathVariable Long id, @RequestBody ReplyRequest req, Authentication authentication) {
        String admin = authentication.getName();
        Query updated = queryService.replyToQuery(id, req.replyMessage, admin);
        return ResponseEntity.ok(updated);
    }

    // DTOs
    public static class CreateQueryRequest {
        public String subject;
        public String message;
        public String studentName;
        public String studentEmail;
    }

    public static class ReplyRequest {
        public String replyMessage;
    }
}
