package com.example.demo.controller;
import org.springframework.security.access.prepost.PreAuthorize;


import com.example.demo.entity.Notice;
import com.example.demo.service.NoticeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/notices")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class NoticeController {

    private final NoticeService noticeService;

    // Constructor Injection
    public NoticeController(NoticeService noticeService) {
        this.noticeService = noticeService;
    }

    // Create Notice
    @PostMapping
    public ResponseEntity<Notice> create(@RequestBody Notice notice) {
        Notice created = noticeService.createNotice(notice);
        return ResponseEntity.ok(created);
    }

    // Get All Notices
    @GetMapping
    public ResponseEntity<List<Notice>> getAll() {
        return ResponseEntity.ok(noticeService.getAllNotices());
    }

    // Get Single Notice
    @GetMapping("/{id}")
    public ResponseEntity<Notice> getById(@PathVariable Long id) {
        Notice notice = noticeService.getNoticeById(id);
        if (notice == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(notice);
    }

    // Delete Notice
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        noticeService.deleteNotice(id);
        return ResponseEntity.ok("Deleted Successfully");
    }

    // ----------- FILE UPLOAD SUPPORT (NEW) ----------------

    @PostMapping("/{id}/attachments")
    public ResponseEntity<String> uploadAttachments(
            @PathVariable Long id,
            @RequestParam("files") List<MultipartFile> files
    ) {
        boolean uploaded = noticeService.uploadFiles(id, files);
        return uploaded
                ? ResponseEntity.ok("Files uploaded successfully")
                : ResponseEntity.badRequest().body("Upload failed");
    }
}
