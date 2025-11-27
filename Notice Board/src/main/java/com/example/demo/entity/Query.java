package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "queries")
public class Query {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subject;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String message;

    private String studentUsername; // link to authenticated student username
    private String studentName;
    private String studentEmail;

    @Enumerated(EnumType.STRING)
    private QueryStatus status = QueryStatus.OPEN;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String replyMessage;

    private String repliedBy; // admin/moderator username
    private LocalDateTime replyDate;

    private LocalDateTime createdAt;

    public Query() {}

    public Query(String subject, String message, String studentUsername, String studentName, String studentEmail) {
        this.subject = subject;
        this.message = message;
        this.studentUsername = studentUsername;
        this.studentName = studentName;
        this.studentEmail = studentEmail;
        this.createdAt = LocalDateTime.now();
    }

    // getters & setters (omitted for brevity in message; paste full set)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getStudentUsername() { return studentUsername; }
    public void setStudentUsername(String studentUsername) { this.studentUsername = studentUsername; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getStudentEmail() { return studentEmail; }
    public void setStudentEmail(String studentEmail) { this.studentEmail = studentEmail; }

    public QueryStatus getStatus() { return status; }
    public void setStatus(QueryStatus status) { this.status = status; }

    public String getReplyMessage() { return replyMessage; }
    public void setReplyMessage(String replyMessage) { this.replyMessage = replyMessage; }

    public String getRepliedBy() { return repliedBy; }
    public void setRepliedBy(String repliedBy) { this.repliedBy = repliedBy; }

    public LocalDateTime getReplyDate() { return replyDate; }
    public void setReplyDate(LocalDateTime replyDate) { this.replyDate = replyDate; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
