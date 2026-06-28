package com.backend.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "teachers")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    @Column(nullable = false, unique = true)
    private String employeeId;

    private String firstName;
    private String lastName;
    private String qualification;
    private Integer experienceYears;
    private String phone;
    private LocalDate hireDate;

    public Teacher() {}

    public Teacher(Long id, User user, String employeeId, String firstName, String lastName,
                   String qualification, Integer experienceYears, String phone, LocalDate hireDate) {
        this.id = id;
        this.user = user;
        this.employeeId = employeeId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.qualification = qualification;
        this.experienceYears = experienceYears;
        this.phone = phone;
        this.hireDate = hireDate;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getEmployeeId() { return employeeId; }
    public void setEmployeeId(String employeeId) { this.employeeId = employeeId; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getQualification() { return qualification; }
    public void setQualification(String qualification) { this.qualification = qualification; }

    public Integer getExperienceYears() { return experienceYears; }
    public void setExperienceYears(Integer experienceYears) { this.experienceYears = experienceYears; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public LocalDate getHireDate() { return hireDate; }
    public void setHireDate(LocalDate hireDate) { this.hireDate = hireDate; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private User user;
        private String employeeId;
        private String firstName;
        private String lastName;
        private String qualification;
        private Integer experienceYears;
        private String phone;
        private LocalDate hireDate;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder user(User user) { this.user = user; return this; }
        public Builder employeeId(String employeeId) { this.employeeId = employeeId; return this; }
        public Builder firstName(String firstName) { this.firstName = firstName; return this; }
        public Builder lastName(String lastName) { this.lastName = lastName; return this; }
        public Builder qualification(String qualification) { this.qualification = qualification; return this; }
        public Builder experienceYears(Integer experienceYears) { this.experienceYears = experienceYears; return this; }
        public Builder phone(String phone) { this.phone = phone; return this; }
        public Builder hireDate(LocalDate hireDate) { this.hireDate = hireDate; return this; }

        public Teacher build() {
            return new Teacher(id, user, employeeId, firstName, lastName, qualification,
                    experienceYears, phone, hireDate);
        }
    }
}