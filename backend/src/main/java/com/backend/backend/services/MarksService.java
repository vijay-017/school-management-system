package com.backend.backend.services;

import com.backend.backend.dto.MarksRequest;
import com.backend.backend.entity.*;
import com.backend.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarksService {

    @Autowired
    private MarksRepository marksRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private ExamRepository examRepository;

    private static final double PASS_THRESHOLD_PERCENT = 35.0;

    public Marks createMarks(MarksRequest request) {

        Student student = studentRepository.findByRollNumber(request.getRollNumber())
                .orElseThrow(() -> new RuntimeException(
                        "Student not found with rollNumber: " + request.getRollNumber()));

        Subject subject = subjectRepository.findById(request.getSubjectId())
                .orElseThrow(() -> new RuntimeException(
                        "Subject not found with id: " + request.getSubjectId()));

        Exam exam = examRepository.findById(request.getExamId())
                .orElseThrow(() -> new RuntimeException(
                        "Exam not found with id: " + request.getExamId()));

        marksRepository.findByStudent_RollNumberAndSubject_IdAndExam_Id(
                request.getRollNumber(), request.getSubjectId(), request.getExamId()
        ).ifPresent(existing -> {
            throw new RuntimeException(
                    "Marks already exist for rollNumber " + request.getRollNumber()
                            + ", subjectId " + request.getSubjectId()
                            + ", examId " + request.getExamId()
                            + ". Use update instead.");
        });

        double maxMarks = request.getMaxMarks() != null ? request.getMaxMarks() : 100.0;

        Marks marks = Marks.builder()
                .student(student)
                .subject(subject)
                .exam(exam)
                .marksObtained(request.getMarksObtained())
                .maxMarks(maxMarks)
                .build();

        applyGrading(marks);

        return marksRepository.save(marks);
    }

    public Marks updateMarks(String rollNumber, Long subjectId, Long examId, MarksRequest request) {

        Marks marks = marksRepository
                .findByStudent_RollNumberAndSubject_IdAndExam_Id(rollNumber, subjectId, examId)
                .orElseThrow(() -> new RuntimeException(
                        "No marks record found for rollNumber " + rollNumber
                                + ", subjectId " + subjectId + ", examId " + examId));

        if (request.getMarksObtained() != null) {
            marks.setMarksObtained(request.getMarksObtained());
        }
        if (request.getMaxMarks() != null) {
            marks.setMaxMarks(request.getMaxMarks());
        }

        applyGrading(marks);

        return marksRepository.save(marks);
    }

    private void applyGrading(Marks marks) {
        double percentage = (marks.getMarksObtained() / marks.getMaxMarks()) * 100.0;
        marks.setPercentage(round(percentage));
        marks.setGrade(calculateGrade(percentage));
        marks.setPassed(percentage >= PASS_THRESHOLD_PERCENT);
    }

    private Grade calculateGrade(double percentage) {
        if (percentage >= 90) return Grade.A_PLUS;
        if (percentage >= 75) return Grade.A;
        if (percentage >= 60) return Grade.B;
        if (percentage >= 45) return Grade.C;
        if (percentage >= 35) return Grade.D;
        return Grade.F;
    }

    private double round(double value) {
        return Math.round(value * 100.0) / 100.0;
    }

    public List<Marks> getAllMarks() {
        return marksRepository.findAll();
    }

    public Marks getMarksById(Long id) {
        return marksRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Marks not found with id: " + id));
    }

    public List<Marks> getMarksByStudent(String rollNumber) {
        return marksRepository.findByStudent_RollNumber(rollNumber);
    }

    public List<Marks> getMarksByStudentAndExam(String rollNumber, Long examId) {
        return marksRepository.findByStudent_RollNumberAndExam_Id(rollNumber, examId);
    }

    public List<Marks> getMarksByExam(Long examId) {
        return marksRepository.findByExam_Id(examId);
    }

    public List<Marks> getMarksByClassAndExam(Long classId, Long examId) {
        return marksRepository.findByStudent_SchoolClass_IdAndExam_Id(classId, examId);
    }

    public void deleteMarks(Long id) {
        marksRepository.deleteById(id);
    }
}