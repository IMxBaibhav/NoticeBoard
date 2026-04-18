package com.example.demo.service;

import com.example.demo.entity.Attachment;
import com.example.demo.entity.Notice;
import com.example.demo.repository.AttachmentRepository;
import com.example.demo.repository.NoticeRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class AttachmentService {

    private final AttachmentRepository attachmentRepository;
    private final NoticeRepository noticeRepository;

    public AttachmentService(AttachmentRepository attachmentRepository,
                             NoticeRepository noticeRepository) {
        this.attachmentRepository = attachmentRepository;
        this.noticeRepository = noticeRepository;
    }

    public Attachment saveAttachment(Long noticeId, MultipartFile file) throws IOException {
        Optional<Notice> opt = noticeRepository.findById(noticeId);
        if (opt.isEmpty()) throw new IllegalArgumentException("Notice not found");

        Notice notice = opt.get();
        Attachment a = new Attachment();
        a.setFilename(file.getOriginalFilename());
        a.setContentType(file.getContentType());
        a.setSize(file.getSize());
        a.setData(file.getBytes());
        a.setNotice(notice);

        // persist
        Attachment saved = attachmentRepository.save(a);
        // add to notice in memory too
        notice.getAttachments().add(saved);
        noticeRepository.save(notice);
        return saved;
    }

    public List<Attachment> getAttachmentsForNotice(Long noticeId) {
        return attachmentRepository.findByNoticeId(noticeId);
    }

    public Optional<Attachment> getAttachment(Long id) {
        return attachmentRepository.findById(id);
    }

    public void deleteAttachment(Long id) {
        attachmentRepository.deleteById(id);
    }
}
