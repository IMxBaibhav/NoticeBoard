package com.example.demo.repository;

import com.example.demo.entity.Query;
import com.example.demo.entity.QueryStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QueryRepository extends JpaRepository<Query, Long> {

    /* Student: get only his/her queries */
    List<Query> findByStudentUsername(String studentUsername);

    /* Admin / Teacher: get queries by status */
    List<Query> findByStatus(QueryStatus status);

    /* Admin / Teacher: student-wise filtering (optional but useful) */
    List<Query> findByStudentUsernameAndStatus(String studentUsername, QueryStatus status);

    /* Dashboard counts (optional, but very useful later) */
    long countByStatus(QueryStatus status);
}
