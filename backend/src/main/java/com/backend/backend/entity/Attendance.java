package com.backend.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(
        name = "attendance",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {
                                "attendance_date",
                                "session",
                                "student_id"
                        }
                )
        }
)
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "attendance_date", nullable = false)
    private LocalDate attendanceDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AttendanceStatus status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AttendanceSession session;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    public Attendance() {}

    public Attendance(Long id, LocalDate attendanceDate, AttendanceStatus status,
                      AttendanceSession session, Student student) {
        this.id = id;
        this.attendanceDate = attendanceDate;
        this.status = status;
        this.session = session;
        this.student = student;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getAttendanceDate() { return attendanceDate; }
    public void setAttendanceDate(LocalDate attendanceDate) { this.attendanceDate = attendanceDate; }

    public AttendanceStatus getStatus() { return status; }
    public void setStatus(AttendanceStatus status) { this.status = status; }

    public AttendanceSession getSession() { return session; }
    public void setSession(AttendanceSession session) { this.session = session; }

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private LocalDate attendanceDate;
        private AttendanceStatus status;
        private AttendanceSession session;
        private Student student;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder attendanceDate(LocalDate attendanceDate) { this.attendanceDate = attendanceDate; return this; }
        public Builder status(AttendanceStatus status) { this.status = status; return this; }
        public Builder session(AttendanceSession session) { this.session = session; return this; }
        public Builder student(Student student) { this.student = student; return this; }

        public Attendance build() {
            return new Attendance(id, attendanceDate, status, session, student);
        }
    }
}