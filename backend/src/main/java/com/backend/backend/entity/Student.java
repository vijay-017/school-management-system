package com.backend.backend.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "students")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

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

    private LocalDate admissionDate;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    @JsonIgnoreProperties("students")
    private Parent parent;
    
}
