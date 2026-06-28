package com.backend.backend.repository;

import com.backend.backend.entity.Marks;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MarksRepository extends JpaRepository<Marks, Long> {

    List<Marks> findByStudent_RollNumber(String rollNumber);

    List<Marks> findByExam_Id(Long examId);

    List<Marks> findBySubject_Id(Long subjectId);

    Optional<Marks> findByStudent_RollNumberAndSubject_IdAndExam_Id(
            String rollNumber, Long subjectId, Long examId);

    List<Marks> findByStudent_RollNumberAndExam_Id(String rollNumber, Long examId);

    List<Marks> findByStudent_SchoolClass_IdAndExam_Id(Long classId, Long examId);
}