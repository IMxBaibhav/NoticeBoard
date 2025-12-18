package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "queries")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Query {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subject;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String message;

    // Student info
    private String studentUsername;
    private String studentName;
    private String studentEmail;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private QueryStatus status = QueryStatus.OPEN;

    // Reply (Admin / Teacher)
    @Lob
    @Column(columnDefinition = "TEXT")
    private String replyMessage;

    private String repliedBy;
    private LocalDateTime replyDate;

    private LocalDateTime createdAt;

    // 📎 Attachment fields
    @Column(length = 255)
    private String attachmentName;   // original file name

    @Column(length = 500)
    private String attachmentPath;   // stored file path

    @Column(length = 20)
    private String attachmentType;   // PDF / IMAGE

    /* Auto set created time */
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    /* Auto set reply time */
    @PreUpdate
    protected void onUpdate() {
        if (this.replyMessage != null && this.replyDate == null) {
            this.replyDate = LocalDateTime.now();
            this.status = QueryStatus.ANSWERED;
        }
    }
}
