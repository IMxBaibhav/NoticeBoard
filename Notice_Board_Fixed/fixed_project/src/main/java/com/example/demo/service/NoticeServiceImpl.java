package com.example.demo.service;

import com.example.demo.entity.Notice;
import com.example.demo.repository.NoticeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeServiceImpl implements NoticeService {

    private final NoticeRepository repository;

    public NoticeServiceImpl(NoticeRepository repository) {
        this.repository = repository;
    }

    @Override
    public Notice createNotice(Notice notice) {
        return repository.save(notice);
    }

    @Override
    public List<Notice> getAllNotices() {
        return repository.findAll();
    }

    @Override
    public Notice getNoticeById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public void deleteNotice(Long id) {
        repository.deleteById(id);
    }

    // Local disk upload logic remove kar diya.
    // Ab sirf AttachmentService (DB-based) use hogi file storage ke liye.
}
