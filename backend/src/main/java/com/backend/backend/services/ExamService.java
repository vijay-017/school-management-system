package com.backend.backend.services;

import com.backend.backend.dto.ExamRequest;
import com.backend.backend.entity.Exam;
import com.backend.backend.entity.SchoolClass;
import com.backend.backend.repository.ExamRepository;
import com.backend.backend.repository.SchoolClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ExamService {

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private SchoolClassRepository schoolClassRepository;

    public Exam createExam(ExamRequest request) {

        SchoolClass schoolClass = schoolClassRepository.findById(request.getClassId())
                .orElseThrow(() -> new RuntimeException(
                        "SchoolClass not found with id: " + request.getClassId()));

        Exam exam = Exam.builder()
                .examName(request.getExamName())
                .examDate(request.getExamDate())
                .schoolClass(schoolClass)
                .build();

        return examRepository.save(exam);
    }

    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    public Exam getExamById(Long id) {
        return examRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exam not found with id: " + id));
    }

    public List<Exam> getExamsByClass(Long classId) {
        return examRepository.findBySchoolClass_Id(classId);
    }

    public List<Exam> getExamsByDate(LocalDate examDate) {
        return examRepository.findByExamDate(examDate);
    }

    public List<Exam> getExamsByName(String examName) {
        return examRepository.findByExamName(examName);
    }

    public Exam updateExam(Long id, ExamRequest request) {

        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exam not found with id: " + id));

        if (request.getExamName() != null) {
            exam.setExamName(request.getExamName());
        }
        if (request.getExamDate() != null) {
            exam.setExamDate(request.getExamDate());
        }
        if (request.getClassId() != null) {
            SchoolClass schoolClass = schoolClassRepository.findById(request.getClassId())
                    .orElseThrow(() -> new RuntimeException(
                            "SchoolClass not found with id: " + request.getClassId()));
            exam.setSchoolClass(schoolClass);
        }

        return examRepository.save(exam);
    }

    public void deleteExam(Long id) {
        examRepository.deleteById(id);
    }
}
