package com.backend.backend.dto;

import java.time.LocalDate;

public class ExamRequest {
    private String examName;
    private LocalDate examDate;
    private Long classId;

    public ExamRequest() {}

    public ExamRequest(String examName, LocalDate examDate, Long classId) {
        this.examName = examName;
        this.examDate = examDate;
        this.classId = classId;
    }

    public String getExamName() { return examName; }
    public void setExamName(String examName) { this.examName = examName; }

    public LocalDate getExamDate() { return examDate; }
    public void setExamDate(LocalDate examDate) { this.examDate = examDate; }

    public Long getClassId() { return classId; }
    public void setClassId(Long classId) { this.classId = classId; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String examName;
        private LocalDate examDate;
        private Long classId;

        public Builder examName(String examName) { this.examName = examName; return this; }
        public Builder examDate(LocalDate examDate) { this.examDate = examDate; return this; }
        public Builder classId(Long classId) { this.classId = classId; return this; }

        public ExamRequest build() {
            return new ExamRequest(examName, examDate, classId);
        }
    }
}
