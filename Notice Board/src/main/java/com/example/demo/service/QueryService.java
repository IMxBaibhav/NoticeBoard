package com.example.demo.service;

import com.example.demo.entity.Query;
import com.example.demo.entity.QueryStatus;
import com.example.demo.repository.QueryRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class QueryService {

    private final QueryRepository queryRepository;

    public QueryService(QueryRepository queryRepository) {
        this.queryRepository = queryRepository;
    }

    public Query createQuery(Query q) {
        q.setCreatedAt(LocalDateTime.now());
        q.setStatus(QueryStatus.OPEN);
        return queryRepository.save(q);
    }

    public List<Query> getQueriesForStudent(String username) {
        return queryRepository.findByStudentUsername(username);
    }

    public List<Query> getAllQueries() {
        return queryRepository.findAll();
    }

    public Optional<Query> getById(Long id) { return queryRepository.findById(id); }

    public Query replyToQuery(Long id, String replyMessage, String repliedBy) {
        Optional<Query> opt = queryRepository.findById(id);
        if (opt.isEmpty()) throw new IllegalArgumentException("Query not found");
        Query q = opt.get();
        q.setReplyMessage(replyMessage);
        q.setRepliedBy(repliedBy);
        q.setReplyDate(LocalDateTime.now());
        q.setStatus(QueryStatus.REPLIED);
        return queryRepository.save(q);
    }
}
