package com.backend.backend.controller;

import com.backend.backend.dto.ExamRequest;
import com.backend.backend.entity.Exam;
import com.backend.backend.services.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/exams")
public class ExamController {

    @Autowired
    private ExamService examService;

    @PostMapping
    public Exam createExam(@RequestBody ExamRequest request) {
        return examService.createExam(request);
    }

    @GetMapping
    public List<Exam> getAllExams() {
        return examService.getAllExams();
    }

    @GetMapping("/{id}")
    public Exam getExamById(@PathVariable Long id) {
        return examService.getExamById(id);
    }

    @GetMapping("/class/{classId}")
    public List<Exam> getExamsByClass(@PathVariable Long classId) {
        return examService.getExamsByClass(classId);
    }

    @GetMapping("/date/{examDate}")
    public List<Exam> getExamsByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate examDate) {
        return examService.getExamsByDate(examDate);
    }

    @GetMapping("/name/{examName}")
    public List<Exam> getExamsByName(@PathVariable String examName) {
        return examService.getExamsByName(examName);
    }

    @PutMapping("/{id}")
    public Exam updateExam(@PathVariable Long id, @RequestBody ExamRequest request) {
        return examService.updateExam(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteExam(@PathVariable Long id) {
        examService.deleteExam(id);
    }
}
