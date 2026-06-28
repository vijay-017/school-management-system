package com.backend.backend.repository;

import com.backend.backend.entity.DayOfWeekEnum;
import com.backend.backend.entity.TimeTable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TimeTableRepository extends JpaRepository<TimeTable, Long> {

    List<TimeTable> findBySchoolClass_Id(Long classId);

    List<TimeTable> findBySchoolClass_IdAndDay(Long classId, DayOfWeekEnum day);

    List<TimeTable> findByTeacher_Id(Long teacherId);

    List<TimeTable> findByTeacher_IdAndDay(Long teacherId, DayOfWeekEnum day);

    Optional<TimeTable> findBySchoolClass_IdAndDayAndPeriodNumber(
            Long classId, DayOfWeekEnum day, Integer periodNumber);

    Optional<TimeTable> findByTeacher_IdAndDayAndPeriodNumber(
            Long teacherId, DayOfWeekEnum day, Integer periodNumber);
}