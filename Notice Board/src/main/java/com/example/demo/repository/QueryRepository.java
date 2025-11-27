package com.example.demo.repository;

import com.example.demo.entity.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QueryRepository extends JpaRepository<Query, Long> {
    List<Query> findByStudentUsername(String username);
}
