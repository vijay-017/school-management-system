package com.backend.backend.controller;

import com.backend.backend.entity.Attendance;
import com.backend.backend.repository.StudentRepository;
import com.backend.backend.services.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping
    public List<Attendance> getAllAttendance() {
        return attendanceService.getAllAttendance();
    }

    @GetMapping("/{id}")
    public Attendance getAttendanceById(@PathVariable Long id) {
        return attendanceService.getAttendanceById(id);
    }

    @PostMapping
    public Attendance createAttendance(@RequestBody Attendance attendance) {
        return attendanceService.createAttendance(attendance);
    }

    @PutMapping("/student/{rollNumber}")
    public Attendance updateAttendance(@PathVariable String rollNumber,
            @RequestBody Attendance attendance) {
        return attendanceService.updateAttendance(rollNumber, attendance);
    }

    @DeleteMapping("/{id}")
    public void deleteAttendance(@PathVariable Long id) {
        attendanceService.deleteAttendance(id);
    }

    
    @GetMapping("/date/{date}")
    public List<Attendance> getAttendanceByDate(@PathVariable LocalDate date) {
        return attendanceService.getAttendanceByDate(date);
    }

    @GetMapping("/student/{rollNumber}")
    public List<Attendance> getAttendanceByStudent(@PathVariable String rollNumber) {
        return attendanceService.getAttendanceByStudent(rollNumber);
    }

    @GetMapping("/class/{classId}")
    public List<Attendance> getAttendanceByClass(@PathVariable Long classId) {
        return attendanceService.getAttendanceByClass(classId);
    }

    @GetMapping("/teacher/{employeeId}")
    public List<Attendance> getAttendanceByTeacher(@PathVariable String employeeId) {
        return attendanceService.getAttendanceByTeacher(employeeId);
    }

    @GetMapping("/debug/student/{rollNumber}")
    public Object debugStudent(@PathVariable String rollNumber) {
        return studentRepository.findByRollNumber(rollNumber)
                .map(s -> (Object) Map.of(
                        "found", true,
                        "id", s.getId(),
                        "rollNumber", s.getRollNumber(),
                        "firstName", s.getFirstName(),
                        "lastName", s.getLastName() != null ? s.getLastName() : ""
                ))
                .orElse(Map.of("found", false, "searched", rollNumber));
    }

}