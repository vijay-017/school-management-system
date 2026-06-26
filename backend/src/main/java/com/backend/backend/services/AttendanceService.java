package com.backend.backend.services;

import com.backend.backend.entity.Attendance;
import com.backend.backend.entity.Student;
import com.backend.backend.repository.AttendanceRepository;
import com.backend.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private StudentRepository studentRepository;

    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    public Attendance getAttendanceById(Long id) {
        return attendanceRepository.findById(id).orElse(null);
    }

    public Attendance createAttendance(Attendance attendance) {

        if (attendance.getStudent() == null || attendance.getStudent().getRollNumber() == null) {
            throw new RuntimeException("Student rollNumber is required");
        }

        String rollNumber = attendance.getStudent().getRollNumber();

        Student student = studentRepository
                .findByRollNumber(rollNumber)
                .orElseThrow(() -> new RuntimeException("Student not found with rollNumber: " + rollNumber));

        attendance.setStudent(student);

        return attendanceRepository.save(attendance);
    }

    public Attendance updateAttendance(String rollNumber, Attendance updatedAttendance) {

        // Find the student first — this also validates the rollNumber is real
        Student student = studentRepository
                .findByRollNumber(rollNumber)
                .orElseThrow(() -> new RuntimeException("Student not found with rollNumber: " + rollNumber));

        // Find the specific attendance record for this student, on this date+session
        Attendance attendance = attendanceRepository
                .findByStudent_RollNumberAndAttendanceDateAndSession(
                        rollNumber,
                        updatedAttendance.getAttendanceDate(),
                        updatedAttendance.getSession()
                )
                .orElseThrow(() -> new RuntimeException(
                        "No attendance record found for rollNumber " + rollNumber
                                + " on " + updatedAttendance.getAttendanceDate()
                                + " (" + updatedAttendance.getSession() + ")"
                ));

        attendance.setAttendanceDate(updatedAttendance.getAttendanceDate());
        attendance.setStatus(updatedAttendance.getStatus());
        attendance.setSession(updatedAttendance.getSession());
        attendance.setStudent(student);

        return attendanceRepository.save(attendance);
    }

    public void deleteAttendance(Long id) {
        attendanceRepository.deleteById(id);
    }

    public List<Attendance> getAttendanceByDate(LocalDate date) {
        return attendanceRepository.findByAttendanceDate(date);
    }

    public List<Attendance> getAttendanceByStudent(String rollNumber) {
        return attendanceRepository.findByStudentRollNumber(rollNumber);
    }

    public List<Attendance> getAttendanceByClass(Long classId) {
        return attendanceRepository.findByStudent_SchoolClass_Id(classId);
    }

    public List<Attendance> getAttendanceByTeacher(String employeeId) {
        return attendanceRepository.findByStudent_SchoolClass_ClassTeacher_EmployeeId(employeeId);
    }
}