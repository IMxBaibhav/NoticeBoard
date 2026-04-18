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

    // Attachment fields
    @Column(length = 255)
    private String attachmentName;

    @Column(length = 500)
    private String attachmentPath;

    @Column(length = 20)
    private String attachmentType;

    //Custom constructor add kiya jo QueryController use karta hai
    public Query(String subject, String message, String studentUsername,
                 String studentName, String studentEmail) {
        this.subject = subject;
        this.message = message;
        this.studentUsername = studentUsername;
        this.studentName = studentName;
        this.studentEmail = studentEmail;
        this.status = QueryStatus.OPEN;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    // Fix 8: @PreUpdate remove kar diya - QueryService already manually set kar raha hai
    // status, replyDate sab kuch. Duplicate logic dangerous tha.
}
