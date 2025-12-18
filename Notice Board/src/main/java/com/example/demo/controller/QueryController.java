package com.example.demo.controller;

import com.example.demo.entity.Query;
import com.example.demo.service.FileStorageService;
import com.example.demo.service.QueryService;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/queries")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class QueryController {

    private final QueryService queryService;
    private final FileStorageService fileStorageService;

    public QueryController(QueryService queryService,
                           FileStorageService fileStorageService) {
        this.queryService = queryService;
        this.fileStorageService = fileStorageService;
    }

    /* =========================
       STUDENT ENDPOINTS
       ========================= */

    // Student creates a query WITH optional file
    @PostMapping(consumes = "multipart/form-data")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<Query> createQuery(
            @RequestPart("data") CreateQueryRequest req,
            @RequestPart(value = "file", required = false) MultipartFile file,
            Authentication authentication
    ) throws Exception {

        String username = authentication.getName();

        Query query = new Query(
                req.subject,
                req.message,
                username,
                req.studentName,
                req.studentEmail
        );

        // Handle file upload (optional)
        if (file != null && !file.isEmpty()) {
            String path = fileStorageService.saveFile(file, "queries");

            query.setAttachmentName(file.getOriginalFilename());
            query.setAttachmentPath(path);
            query.setAttachmentType(file.getContentType());
        }

        return ResponseEntity.ok(queryService.createQuery(query));
    }

    // Student fetches own queries
    @GetMapping("/mine")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<List<Query>> myQueries(Authentication authentication) {
        return ResponseEntity.ok(
                queryService.getQueriesForStudent(authentication.getName())
        );
    }

    /* =========================
       ADMIN / MODERATOR ENDPOINTS
       ========================= */

    // Admin/Moderator fetch all queries
    @GetMapping("/all")
    @PreAuthorize("hasAnyAuthority('ADMIN','MODERATOR')")
    public ResponseEntity<List<Query>> allQueries() {
        return ResponseEntity.ok(queryService.getAllQueries());
    }

    // Admin/Moderator replies to a query
    @PutMapping("/{id}/reply")
    @PreAuthorize("hasAnyAuthority('ADMIN','MODERATOR')")
    public ResponseEntity<Query> replyToQuery(
            @PathVariable Long id,
            @RequestBody ReplyRequest req,
            Authentication authentication
    ) {
        return ResponseEntity.ok(
                queryService.replyToQuery(
                        id,
                        req.replyMessage,
                        authentication.getName()
                )
        );
    }

    /* =========================
       DTO CLASSES
       ========================= */

    public static class CreateQueryRequest {
        @NotBlank public String subject;
        @NotBlank public String message;
        @NotBlank public String studentName;
        @NotBlank public String studentEmail;
    }

    public static class ReplyRequest {
        @NotBlank public String replyMessage;
    }
}
