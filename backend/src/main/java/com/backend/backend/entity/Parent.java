package com.backend.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "parents")
public class Parent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fatherName;

    @Column(nullable = false)
    private String motherName;

    @Column(nullable = false)
    private String phone;

    @Column(unique = true)
    private String email;

    private String occupation;

    @Column(columnDefinition = "TEXT")
    private String address;

    @OneToMany(mappedBy = "parent")
    @JsonIgnoreProperties("parent")
    private List<Student> students;

    public Parent() {}

    public Parent(Long id, String fatherName, String motherName, String phone,
                  String email, String occupation, String address, List<Student> students) {
        this.id = id;
        this.fatherName = fatherName;
        this.motherName = motherName;
        this.phone = phone;
        this.email = email;
        this.occupation = occupation;
        this.address = address;
        this.students = students;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFatherName() { return fatherName; }
    public void setFatherName(String fatherName) { this.fatherName = fatherName; }

    public String getMotherName() { return motherName; }
    public void setMotherName(String motherName) { this.motherName = motherName; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getOccupation() { return occupation; }
    public void setOccupation(String occupation) { this.occupation = occupation; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public List<Student> getStudents() { return students; }
    public void setStudents(List<Student> students) { this.students = students; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String fatherName;
        private String motherName;
        private String phone;
        private String email;
        private String occupation;
        private String address;
        private List<Student> students;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder fatherName(String fatherName) { this.fatherName = fatherName; return this; }
        public Builder motherName(String motherName) { this.motherName = motherName; return this; }
        public Builder phone(String phone) { this.phone = phone; return this; }
        public Builder email(String email) { this.email = email; return this; }
        public Builder occupation(String occupation) { this.occupation = occupation; return this; }
        public Builder address(String address) { this.address = address; return this; }
        public Builder students(List<Student> students) { this.students = students; return this; }

        public Parent build() {
            return new Parent(id, fatherName, motherName, phone, email, occupation, address, students);
        }
    }
}