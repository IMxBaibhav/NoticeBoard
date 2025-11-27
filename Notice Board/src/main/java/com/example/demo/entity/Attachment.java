package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "attachments")
public class Attachment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // original filename
    private String filename;

    private String contentType;

    // file size in bytes
    private Long size;

    // store binary data in DB
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] data;

    private LocalDateTime uploadedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "notice_id")
    private Notice notice;

    public Attachment() {}

    public Attachment(String filename, String contentType, Long size, byte[] data, Notice notice) {
        this.filename = filename;
        this.contentType = contentType;
        this.size = size;
        this.data = data;
        this.notice = notice;
        this.uploadedAt = LocalDateTime.now();
    }

    // getters & setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFilename() { return filename; }
    public void setFilename(String filename) { this.filename = filename; }

    public String getContentType() { return contentType; }
    public void setContentType(String contentType) { this.contentType = contentType; }

    public Long getSize() { return size; }
    public void setSize(Long size) { this.size = size; }

    public byte[] getData() { return data; }
    public void setData(byte[] data) { this.data = data; }

    public LocalDateTime getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }

    public Notice getNotice() { return notice; }
    public void setNotice(Notice notice) { this.notice = notice; }
}
