package com.backend.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.backend.entity.Student;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {

    Optional<Student> findByRollNumber(String roll_number);

    void deleteByRollNumber(String roll_number);
}