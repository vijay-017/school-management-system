package com.backend.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "teacher_subjects")
public class TeacherSubject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;

    public TeacherSubject() {}

    public TeacherSubject(Long id, Teacher teacher, Subject subject) {
        this.id = id;
        this.teacher = teacher;
        this.subject = subject;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Teacher getTeacher() { return teacher; }
    public void setTeacher(Teacher teacher) { this.teacher = teacher; }

    public Subject getSubject() { return subject; }
    public void setSubject(Subject subject) { this.subject = subject; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private Teacher teacher;
        private Subject subject;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder teacher(Teacher teacher) { this.teacher = teacher; return this; }
        public Builder subject(Subject subject) { this.subject = subject; return this; }

        public TeacherSubject build() {
            return new TeacherSubject(id, teacher, subject);
        }
    }
}
