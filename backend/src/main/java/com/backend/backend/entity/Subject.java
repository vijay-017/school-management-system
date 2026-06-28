package com.backend.backend.entity;

import jakarta.persistence.*;
import java.util.*;

@Entity
@Table(name = "subjects")
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String subjectName;

    @Column(unique = true)
    private String subjectCode;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

    @ManyToMany(mappedBy = "subjects")
    private List<SchoolClass> schoolClasses;

    public Subject() {}

    public Subject(Long id, String subjectName, String subjectCode,
                   Teacher teacher, List<SchoolClass> schoolClasses) {
        this.id = id;
        this.subjectName = subjectName;
        this.subjectCode = subjectCode;
        this.teacher = teacher;
        this.schoolClasses = schoolClasses;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSubjectName() { return subjectName; }
    public void setSubjectName(String subjectName) { this.subjectName = subjectName; }

    public String getSubjectCode() { return subjectCode; }
    public void setSubjectCode(String subjectCode) { this.subjectCode = subjectCode; }

    public Teacher getTeacher() { return teacher; }
    public void setTeacher(Teacher teacher) { this.teacher = teacher; }

    public List<SchoolClass> getSchoolClasses() { return schoolClasses; }
    public void setSchoolClasses(List<SchoolClass> schoolClasses) { this.schoolClasses = schoolClasses; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String subjectName;
        private String subjectCode;
        private Teacher teacher;
        private List<SchoolClass> schoolClasses;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder subjectName(String subjectName) { this.subjectName = subjectName; return this; }
        public Builder subjectCode(String subjectCode) { this.subjectCode = subjectCode; return this; }
        public Builder teacher(Teacher teacher) { this.teacher = teacher; return this; }
        public Builder schoolClasses(List<SchoolClass> schoolClasses) { this.schoolClasses = schoolClasses; return this; }

        public Subject build() {
            return new Subject(id, subjectName, subjectCode, teacher, schoolClasses);
        }
    }
}