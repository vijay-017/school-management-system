package com.backend.backend.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "classes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SchoolClass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String className;

    private String section;

    @ManyToOne
    @JoinColumn(name = "class_teacher_id")
    private Teacher classTeacher;
}
