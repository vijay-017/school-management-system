package com.backend.backend.dto;

import com.backend.backend.entity.AttendanceSession;
import com.backend.backend.entity.AttendanceStatus;

import java.time.LocalDate;

public class AttendanceRequest {

    private LocalDate attendanceDate;
    private AttendanceStatus status;
    private AttendanceSession session;
    private StudentRef student;

    public AttendanceRequest() {}

    public AttendanceRequest(LocalDate attendanceDate, AttendanceStatus status,
                             AttendanceSession session, StudentRef student) {
        this.attendanceDate = attendanceDate;
        this.status = status;
        this.session = session;
        this.student = student;
    }

    public LocalDate getAttendanceDate() { return attendanceDate; }
    public void setAttendanceDate(LocalDate attendanceDate) { this.attendanceDate = attendanceDate; }

    public AttendanceStatus getStatus() { return status; }
    public void setStatus(AttendanceStatus status) { this.status = status; }

    public AttendanceSession getSession() { return session; }
    public void setSession(AttendanceSession session) { this.session = session; }

    public StudentRef getStudent() { return student; }
    public void setStudent(StudentRef student) { this.student = student; }

    public static class StudentRef {
        private Long id;
        private String rollNumber;

        public StudentRef() {}

        public StudentRef(Long id, String rollNumber) {
            this.id = id;
            this.rollNumber = rollNumber;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getRollNumber() { return rollNumber; }
        public void setRollNumber(String rollNumber) { this.rollNumber = rollNumber; }
    }
}
