package com.example.demo.service;

import com.example.demo.entity.Notice;
import java.util.List;

public interface NoticeService {
    Notice createNotice(Notice notice);
    List<Notice> getAllNotices();
    Notice getNoticeById(Long id);
    void deleteNotice(Long id);
}
