package com.backend.backend.dto;

import com.backend.backend.entity.AttendanceSession;
import com.backend.backend.entity.AttendanceStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceRequest {

    private LocalDate attendanceDate;
    private AttendanceStatus status;
    private AttendanceSession session;
    private StudentRef student;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StudentRef {
        private Long id;
        private String rollNumber;
    }
}
