package com.backend.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    @Column(nullable = false, unique = true)
    private String rollNumber;

    @Column(nullable = false)
    private String firstName;

    private String lastName;
    private String gender;
    private LocalDate dateOfBirth;
    private String phone;

    @Column(columnDefinition = "TEXT")
    private String address;

    @ManyToOne
    @JoinColumn(name = "class_id")
    @JsonIgnoreProperties({"classTeacher", "students"})
    private SchoolClass schoolClass;

    pri LocalDate admissionDate;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    @JsonIgnoreProperties("students")
    private Parent parent;

    public Student() {}

    public Student(Long id, User user, String rollNumber, String firstName, String lastName,
                   String gender, LocalDate dateOfBirth, String phone, String address,
                   SchoolClass schoolClass, LocalDate admissionDate, Parent parent) {
        this.id = id;
        this.user = user;
        this.rollNumber = rollNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.phone = phone;
        this.address = address;
        this.schoolClass = schoolClass;
        this.admissionDate = admissionDate;
        this.parent = parent;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getRollNumber() { return rollNumber; }
    public void setRollNumber(String rollNumber) { this.rollNumber = rollNumber; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public SchoolClass getSchoolClass() { return schoolClass; }
    public void setSchoolClass(SchoolClass schoolClass) { this.schoolClass = schoolClass; }

    public LocalDate getAdmissionDate() { return admissionDate; }
    public void setAdmissionDate(LocalDate admissionDate) { this.admissionDate = admissionDate; }

    public Parent getParent() { return parent; }
    public void setParent(Parent parent) { this.parent = parent; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private User user;
        private String rollNumber;
        private String firstName;
        private String lastName;
        private String gender;
        private LocalDate dateOfBirth;
        private String phone;
        private String address;
        private SchoolClass schoolClass;
        private LocalDate admissionDate;
        private Parent parent;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder user(User user) { this.user = user; return this; }
        public Builder rollNumber(String rollNumber) { this.rollNumber = rollNumber; return this; }
        public Builder firstName(String firstName) { this.firstName = firstName; return this; }
        public Builder lastName(String lastName) { this.lastName = lastName; return this; }
        public Builder gender(String gender) { this.gender = gender; return this; }
        public Builder dateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; return this; }
        public Builder phone(String phone) { this.phone = phone; return this; }
        public Builder address(String address) { this.address = address; return this; }
        public Builder schoolClass(SchoolClass schoolClass) { this.schoolClass = schoolClass; return this; }
        public Builder admissionDate(LocalDate admissionDate) { this.admissionDate = admissionDate; return this; }
        public Builder parent(Parent parent) { this.parent = parent; return this; }

        public Student build() {
            return new Student(id, user, rollNumber, firstName, lastName, gender,
                    dateOfBirth, phone, address, schoolClass, admissionDate, parent);
        }
    }
}
