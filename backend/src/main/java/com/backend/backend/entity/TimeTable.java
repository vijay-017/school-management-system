package com.backend.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(
        name = "timetable",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uq_class_day_period",
                        columnNames = {"class_id", "day", "period_number"}
                ),
                @UniqueConstraint(
                        name = "uq_teacher_day_period",
                        columnNames = {"teacher_id", "day", "period_number"}
                )
        }
)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class TimeTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "class_id", nullable = false)
    @JsonIgnoreProperties({"classTeacher", "subjects"})
    private SchoolClass schoolClass;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DayOfWeekEnum day;

    @Column(name = "period_number", nullable = false)
    private Integer periodNumber;

    @ManyToOne
    @JoinColumn(name = "subject_id", nullable = false)
    @JsonIgnoreProperties({"teacher", "schoolClasses"})
    private Subject subject;

    @ManyToOne
    @JoinColumn(name = "teacher_id", nullable = false)
    private Teacher teacher;

    public TimeTable() {}

    public TimeTable(Long id, SchoolClass schoolClass, DayOfWeekEnum day,
                     Integer periodNumber, Subject subject, Teacher teacher) {
        this.id = id;
        this.schoolClass = schoolClass;
        this.day = day;
        this.periodNumber = periodNumber;
        this.subject = subject;
        this.teacher = teacher;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public SchoolClass getSchoolClass() { return schoolClass; }
    public void setSchoolClass(SchoolClass schoolClass) { this.schoolClass = schoolClass; }

    public DayOfWeekEnum getDay() { return day; }
    public void setDay(DayOfWeekEnum day) { this.day = day; }

    public Integer getPeriodNumber() { return periodNumber; }
    public void setPeriodNumber(Integer periodNumber) { this.periodNumber = periodNumber; }

    public Subject getSubject() { return subject; }
    public void setSubject(Subject subject) { this.subject = subject; }

    public Teacher getTeacher() { return teacher; }
    public void setTeacher(Teacher teacher) { this.teacher = teacher; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private SchoolClass schoolClass;
        private DayOfWeekEnum day;
        private Integer periodNumber;
        private Subject subject;
        private Teacher teacher;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder schoolClass(SchoolClass schoolClass) { this.schoolClass = schoolClass; return this; }
        public Builder day(DayOfWeekEnum day) { this.day = day; return this; }
        public Builder periodNumber(Integer periodNumber) { this.periodNumber = periodNumber; return this; }
        public Builder subject(Subject subject) { this.subject = subject; return this; }
        public Builder teacher(Teacher teacher) { this.teacher = teacher; return this; }

        public TimeTable build() {
            return new TimeTable(id, schoolClass, day, periodNumber, subject, teacher);
        }
    }
}