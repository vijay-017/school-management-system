package com.backend.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
        name = "classes",
        uniqueConstraints = {
                @UniqueConstraint( columnNames = {"class_name", "section"})
        }
)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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

}
