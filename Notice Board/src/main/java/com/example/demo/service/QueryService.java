package com.example.demo.service;

import com.example.demo.entity.Query;
import com.example.demo.entity.QueryStatus;
import com.example.demo.repository.QueryRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class QueryService {

    private final QueryRepository queryRepository;

    public QueryService(QueryRepository queryRepository) {
        this.queryRepository = queryRepository;
    }

    /* =========================
       STUDENT ACTIONS
       ========================= */

    // Student creates a query
    public Query createQuery(Query query) {
        query.setCreatedAt(LocalDateTime.now());
        query.setStatus(QueryStatus.OPEN);
        return queryRepository.save(query);
    }

    // Student views own queries
    public List<Query> getQueriesForStudent(String username) {
        return queryRepository.findByStudentUsername(username);
    }

    /* =========================
       ADMIN / TEACHER ACTIONS
       ========================= */

    // Admin / Teacher: view all queries
    public List<Query> getAllQueries() {
        return queryRepository.findAll();
    }

    // Admin / Teacher: view by status
    public List<Query> getQueriesByStatus(QueryStatus status) {
        return queryRepository.findByStatus(status);
    }

    // Get query by ID
    public Query getQueryById(Long id) {
        return queryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Query not found"));
    }

    // Admin / Teacher reply to query
    public Query replyToQuery(Long id, String replyMessage, String repliedBy) {
        Query query = getQueryById(id);

        query.setReplyMessage(replyMessage);
        query.setRepliedBy(repliedBy);
        query.setReplyDate(LocalDateTime.now());
        query.setStatus(QueryStatus.REPLIED);

        return queryRepository.save(query);
    }
}
