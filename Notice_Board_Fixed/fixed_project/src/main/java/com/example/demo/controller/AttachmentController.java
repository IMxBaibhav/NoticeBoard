package com.example.demo.controller;

import com.example.demo.entity.Attachment;
import com.example.demo.service.AttachmentService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/attachments")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AttachmentController {

    private final AttachmentService attachmentService;

    public AttachmentController(AttachmentService attachmentService) {
        this.attachmentService = attachmentService;
    }

    // Upload one file to a notice (ADMIN or MODERATOR)
    @PreAuthorize("hasAnyAuthority('ADMIN','MODERATOR')")
    @PostMapping("/notice/{noticeId}")
    public ResponseEntity<?> uploadToNotice(@PathVariable Long noticeId,
                                            @RequestParam("file") MultipartFile file) {
        try {
            Attachment saved = attachmentService.saveAttachment(noticeId, file);
            return ResponseEntity.ok(saved.getId());
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body("Upload failed: " + ex.getMessage());
        }
    }

    // List attachments for a notice (public)
    @GetMapping("/notice/{noticeId}")
    public ResponseEntity<List<Attachment>> listForNotice(@PathVariable Long noticeId) {
        return ResponseEntity.ok(attachmentService.getAttachmentsForNotice(noticeId));
    }

    // Download attachment by id
    @GetMapping("/{id}")
    public ResponseEntity<byte[]> download(@PathVariable Long id) {
        return attachmentService.getAttachment(id)
                .map(a -> ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + a.getFilename() + "\"")
                        .contentType(MediaType.parseMediaType(a.getContentType() == null ? "application/octet-stream" : a.getContentType()))
                        .body(a.getData()))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','MODERATOR')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        attachmentService.deleteAttachment(id);
        return ResponseEntity.ok("Deleted");
    }
}
