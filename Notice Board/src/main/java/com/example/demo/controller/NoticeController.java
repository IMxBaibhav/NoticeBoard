package com.example.demo.controller;

import com.example.demo.entity.Notice;
import com.example.demo.service.NoticeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notices")
public class NoticeController {

    private final NoticeService noticeService;

    //  Manual constructor
    public NoticeController(NoticeService noticeService) {
        this.noticeService = noticeService;
    }

    @PostMapping
    public Notice create(@RequestBody Notice notice) {
        return noticeService.createNotice(notice);
    }

    @GetMapping
    public List<Notice> getAll() {
        return noticeService.getAllNotices();
    }

    @GetMapping("/{id}")
    public Notice getById(@PathVariable Long id) {
        return noticeService.getNoticeById(id);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        noticeService.deleteNotice(id);
        return "Deleted Successfully";
    }
}
