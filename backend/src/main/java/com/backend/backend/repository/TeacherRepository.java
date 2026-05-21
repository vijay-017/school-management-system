package com.backend.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.backend.entity.Teacher;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
}
