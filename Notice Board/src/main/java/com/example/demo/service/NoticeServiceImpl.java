package com.example.demo.service;

import com.example.demo.entity.Notice;
import com.example.demo.repository.NoticeRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class NoticeServiceImpl implements NoticeService {

    private final NoticeRepository repository;

    public NoticeServiceImpl(NoticeRepository repository) {
        this.repository = repository;
    }

    @Override
    public Notice createNotice(Notice notice) {
        // Save the notice with timestamps (set in entity using @PrePersist)
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

    
    //      FILE UPLOAD LOGIC 
    
    @Override
    public boolean uploadFiles(Long noticeId, List<MultipartFile> files) {

        Notice notice = repository.findById(noticeId).orElse(null);
        if (notice == null) return false;

        // Create folder if not exists
        String uploadDir = "uploads/notices/" + noticeId;
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        try {
            for (MultipartFile file : files) {
                String filePath = uploadDir + "/" + file.getOriginalFilename();
                File dest = new File(filePath);
                file.transferTo(dest); // Save the file locally
            }
            return true;

        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }
}
