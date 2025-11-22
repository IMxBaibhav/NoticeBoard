package com.example.demo.controller;
import com.example.demo.service.NoticeService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.example.demo.Entity.Notice;

@RestController
@RequestMapping("/api/notices")
@RequiredArgsConstructor

public class NoticeController {
    private final NoticeService noticeService;

    @PostMapping
    public Notice create(@RequestBody Notice notice){
        return noticeService.createNotice(notice);
    }
    @GetMapping
    public list<Notice> getAll(){
        return noticeService.getAllNotice();
    }
    @GetMapping("/{Id}")
    public Notice getById(@PathVariable Long id){
        return noticeService.getNoticeById(id);
    }
        @DeleteMapping("/{Id}")
        public String delete(@PathVariable Long id){
            noticeService.deleteNotice(id);
            return "Deleted Successfully";
        }

}
