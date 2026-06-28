package com.backend.backend.controller;

import com.backend.backend.dto.MarksRequest;
import com.backend.backend.entity.Marks;
import com.backend.backend.services.MarksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/marks")
public class MarksController {

    @Autowired
    private MarksService marksService;

    @PostMapping
    public Marks createMarks(@RequestBody MarksRequest request) {
        return marksService.createMarks(request);
    }

    @PutMapping("/student/{rollNumber}/subject/{subjectId}/exam/{examId}")
    public Marks updateMarks(@PathVariable String rollNumber,
                             @PathVariable Long subjectId,
                             @PathVariable Long examId,
                             @RequestBody MarksRequest request) {
        return marksService.updateMarks(rollNumber, subjectId, examId, request);
    }

    @GetMapping
    public List<Marks> getAllMarks() {
        return marksService.getAllMarks();
    }

    @GetMapping("/{id}")
    public Marks getMarksById(@PathVariable Long id) {
        return marksService.getMarksById(id);
    }

    @GetMapping("/student/{rollNumber}")
    public List<Marks> getMarksByStudent(@PathVariable String rollNumber) {
        return marksService.getMarksByStudent(rollNumber);
    }

    @GetMapping("/student/{rollNumber}/exam/{examId}")
    public List<Marks> getMarksByStudentAndExam(@PathVariable String rollNumber,
                                                @PathVariable Long examId) {
        return marksService.getMarksByStudentAndExam(rollNumber, examId);
    }

    @GetMapping("/exam/{examId}")
    public List<Marks> getMarksByExam(@PathVariable Long examId) {
        return marksService.getMarksByExam(examId);
    }

    @GetMapping("/class/{classId}/exam/{examId}")
    public List<Marks> getMarksByClassAndExam(@PathVariable Long classId,
                                              @PathVariable Long examId) {
        return marksService.getMarksByClassAndExam(classId, examId);
    }

    @DeleteMapping("/{id}")
    public void deleteMarks(@PathVariable Long id) {
        marksService.deleteMarks(id);
    }
}