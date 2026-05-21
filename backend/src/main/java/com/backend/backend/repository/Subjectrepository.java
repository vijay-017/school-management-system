package com.backend.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.backend.entity.Subject;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
}