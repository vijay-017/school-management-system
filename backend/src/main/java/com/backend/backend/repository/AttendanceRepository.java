package com.backend.backend.repository;

import com.backend.backend.entity.Attendance;
import com.backend.backend.entity.AttendanceSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    List<Attendance> findByAttendanceDate(LocalDate attendanceDate);

    List<Attendance> findByStudentRollNumber(String rollNumber);

    List<Attendance> findByAttendanceDateAndSession(
            LocalDate attendanceDate,
            AttendanceSession session
    );

    // Used by updateAttendance — finds the specific record for a student on a given date+session
    Optional<Attendance> findByStudent_RollNumberAndAttendanceDateAndSession(
            String rollNumber,
            LocalDate attendanceDate,
            AttendanceSession session
    );

    // Needed for getAttendanceByClass — assumes Student has a schoolClass field
    // with an id, and Student is linked via Attendance.student
    List<Attendance> findByStudent_SchoolClass_Id(Long classId);

    // Needed for getAttendanceByTeacher — navigates Student → SchoolClass → classTeacher → employeeId
    List<Attendance> findByStudent_SchoolClass_ClassTeacher_EmployeeId(String employeeId);
}