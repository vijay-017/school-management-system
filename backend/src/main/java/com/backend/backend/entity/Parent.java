package com.backend.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "parents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
    private List<Student> students;
}