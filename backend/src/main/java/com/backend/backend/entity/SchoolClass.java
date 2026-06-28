package com.backend.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(
        name = "classes",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"class_name", "section"})
        }
)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class SchoolClass {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "class_name")
    private String className;

    @Column(nullable = false)
    private String section;

    @Column(name = "room_number", unique = true)
    private String roomNumber;

    private Integer capacity;

    @OneToOne
    @JoinColumn(name = "class_teacher_id", unique = true)
    private Teacher classTeacher;

    @ManyToMany
    @JoinTable(
            name = "class_subject",
            joinColumns = @JoinColumn(name = "class_id"),
            inverseJoinColumns = @JoinColumn(name = "subject_id")
    )
    @JsonIgnoreProperties({"schoolClasses"})
    private List<Subject> subjects;

    public SchoolClass() {}

    public SchoolClass(Long id, String className, String section, String roomNumber,
                       Integer capacity, Teacher classTeacher, List<Subject> subjects) {
        this.id = id;
        this.className = className;
        this.section = section;
        this.roomNumber = roomNumber;
        this.capacity = capacity;
        this.classTeacher = classTeacher;
        this.subjects = subjects;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getClassName() { return className; }
    public void setClassName(String className) { this.className = className; }

    public String getSection() { return section; }
    public void setSection(String section) { this.section = section; }

    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }

    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }

    public Teacher getClassTeacher() { return classTeacher; }
    public void setClassTeacher(Teacher classTeacher) { this.classTeacher = classTeacher; }

    public List<Subject> getSubjects() { return subjects; }
    public void setSubjects(List<Subject> subjects) { this.subjects = subjects; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String className;
        private String section;
        private String roomNumber;
        private Integer capacity;
        private Teacher classTeacher;
        private List<Subject> subjects;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder className(String className) { this.className = className; return this; }
        public Builder section(String section) { this.section = section; return this; }
        public Builder roomNumber(String roomNumber) { this.roomNumber = roomNumber; return this; }
        public Builder capacity(Integer capacity) { this.capacity = capacity; return this; }
        public Builder classTeacher(Teacher classTeacher) { this.classTeacher = classTeacher; return this; }
        public Builder subjects(List<Subject> subjects) { this.subjects = subjects; return this; }

        public SchoolClass build() {
            return new SchoolClass(id, className, section, roomNumber, capacity, classTeacher, subjects);
        }
    }
}