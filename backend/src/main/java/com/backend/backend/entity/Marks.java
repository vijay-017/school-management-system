package com.backend.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(
        name = "marks",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"student_id", "subject_id", "exam_id"}
                )
        }
)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Marks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    @JsonIgnoreProperties({"schoolClass", "parent", "user"})
    private Student student;

    @ManyToOne
    @JoinColumn(name = "subject_id", nullable = false)
    @JsonIgnoreProperties({"teacher", "schoolClasses"})
    private Subject subject;

    @ManyToOne
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;

    @Column(nullable = false)
    private Double marksObtained;

    @Column(nullable = false)
    private Double maxMarks = 100.0;

    // Derived fields — calculated by the service, not set directly by clients
    private Double percentage;

    @Enumerated(EnumType.STRING)
    private Grade grade;

    private Boolean passed;

    public Marks() {}

    public Marks(Long id, Student student, Subject subject, Exam exam,
                 Double marksObtained, Double maxMarks, Double percentage,
                 Grade grade, Boolean passed) {
        this.id = id;
        this.student = student;
        this.subject = subject;
        this.exam = exam;
        this.marksObtained = marksObtained;
        this.maxMarks = maxMarks;
        this.percentage = percentage;
        this.grade = grade;
        this.passed = passed;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }

    public Subject getSubject() { return subject; }
    public void setSubject(Subject subject) { this.subject = subject; }

    public Exam getExam() { return exam; }
    public void setExam(Exam exam) { this.exam = exam; }

    public Double getMarksObtained() { return marksObtained; }
    public void setMarksObtained(Double marksObtained) { this.marksObtained = marksObtained; }

    public Double getMaxMarks() { return maxMarks; }
    public void setMaxMarks(Double maxMarks) { this.maxMarks = maxMarks; }

    public Double getPercentage() { return percentage; }
    public void setPercentage(Double percentage) { this.percentage = percentage; }

    public Grade getGrade() { return grade; }
    public void setGrade(Grade grade) { this.grade = grade; }

    public Boolean getPassed() { return passed; }
    public void setPassed(Boolean passed) { this.passed = passed; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private Student student;
        private Subject subject;
        private Exam exam;
        private Double marksObtained;
        private Double maxMarks = 100.0;
        private Double percentage;
        private Grade grade;
        private Boolean passed;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder student(Student student) { this.student = student; return this; }
        public Builder subject(Subject subject) { this.subject = subject; return this; }
        public Builder exam(Exam exam) { this.exam = exam; return this; }
        public Builder marksObtained(Double marksObtained) { this.marksObtained = marksObtained; return this; }
        public Builder maxMarks(Double maxMarks) { this.maxMarks = maxMarks; return this; }
        public Builder percentage(Double percentage) { this.percentage = percentage; return this; }
        public Builder grade(Grade grade) { this.grade = grade; return this; }
        public Builder passed(Boolean passed) { this.passed = passed; return this; }

        public Marks build() {
            return new Marks(id, student, subject, exam, marksObtained, maxMarks, percentage, grade, passed);
        }
    }
}