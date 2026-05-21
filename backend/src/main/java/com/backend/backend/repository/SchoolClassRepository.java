package com.backend.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.backend.entity.SchoolClass;

public interface SchoolClassRepository extends JpaRepository<SchoolClass, Long> {
}