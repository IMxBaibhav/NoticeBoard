package com.example.demo.service;

import com.example.demo.entity.Notice;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface NoticeService {

    Notice createNotice(Notice notice);

    List<Notice> getAllNotices();

    Notice getNoticeById(Long id);

    void deleteNotice(Long id);

    // NEW → File upload support
    boolean uploadFiles(Long noticeId, List<MultipartFile> files);
}
