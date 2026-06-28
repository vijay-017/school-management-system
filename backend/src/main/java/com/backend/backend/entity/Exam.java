package com.backend.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "exams")
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String examName;

    @Column(nullable = false)
    private LocalDate examDate;

    @ManyToOne
    @JoinColumn(name = "class_id", nullable = false)
    @JsonIgnoreProperties({"classTeacher", "subjects"})
    private SchoolClass schoolClass;

    public Exam() {}

    public Exam(Long id, String examName, LocalDate examDate, SchoolClass schoolClass) {
        this.id = id;
        this.examName = examName;
        this.examDate = examDate;
        this.schoolClass = schoolClass;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getExamName() { return examName; }
    public void setExamName(String examName) { this.examName = examName; }

    public LocalDate getExamDate() { return examDate; }
    public void setExamDate(LocalDate examDate) { this.examDate = examDate; }

    public SchoolClass getSchoolClass() { return schoolClass; }
    public void setSchoolClass(SchoolClass schoolClass) { this.schoolClass = schoolClass; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String examName;
        private LocalDate examDate;
        private SchoolClass schoolClass;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder examName(String examName) { this.examName = examName; return this; }
        public Builder examDate(LocalDate examDate) { this.examDate = examDate; return this; }
        public Builder schoolClass(SchoolClass schoolClass) { this.schoolClass = schoolClass; return this; }

        public Exam build() {
            return new Exam(id, examName, examDate, schoolClass);
        }
    }
}
