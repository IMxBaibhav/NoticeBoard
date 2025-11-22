package com.example.demo.service;
import com.example.demo.Entity.Notice;
import java.util.List;

public interface NoticeService {
    
    Notice createNotice(Notice notice);
    List<Notice> getAllNotice();
    Notice getNoticeById(Long Id);
    void deleteNotice(Long Id);
}
