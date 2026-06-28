package com.backend.backend.repository;

import com.backend.backend.entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ExamRepository extends JpaRepository<Exam, Long> {

    List<Exam> findBySchoolClass_Id(Long classId);

    List<Exam> findByExamDate(LocalDate examDate);

    List<Exam> findByExamName(String examName);

    List<Exam> findBySchoolClass_IdAndExamName(Long classId, String examName);
}
