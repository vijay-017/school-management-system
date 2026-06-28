package com.backend.backend.services;

import com.backend.backend.dto.TimeTableRequest;
import com.backend.backend.entity.*;
import com.backend.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TimeTableService {

    @Autowired
    private TimeTableRepository timeTableRepository;

    @Autowired
    private SchoolClassRepository schoolClassRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    private static final int MIN_PERIOD = 1;
    private static final int MAX_PERIOD = 8;

    public TimeTable createEntry(TimeTableRequest request) {

        validatePeriodRange(request.getPeriodNumber());

        SchoolClass schoolClass = schoolClassRepository.findById(request.getClassId())
                .orElseThrow(() -> new RuntimeException(
                        "SchoolClass not found with id: " + request.getClassId()));

        Subject subject = subjectRepository.findById(request.getSubjectId())
                .orElseThrow(() -> new RuntimeException(
                        "Subject not found with id: " + request.getSubjectId()));

        Teacher teacher = teacherRepository.findById(request.getTeacherId())
                .orElseThrow(() -> new RuntimeException(
                        "Teacher not found with id: " + request.getTeacherId()));

        checkClassConflict(request.getClassId(), request.getDay(), request.getPeriodNumber());
        checkTeacherConflict(request.getTeacherId(), request.getDay(), request.getPeriodNumber());

        TimeTable entry = TimeTable.builder()
                .schoolClass(schoolClass)
                .day(request.getDay())
                .periodNumber(request.getPeriodNumber())
                .subject(subject)
                .teacher(teacher)
                .build();

        return timeTableRepository.save(entry);
    }

    public TimeTable updateEntry(Long id, TimeTableRequest request) {

        TimeTable entry = timeTableRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("TimeTable entry not found with id: " + id));

        DayOfWeekEnum day = request.getDay() != null ? request.getDay() : entry.getDay();
        Integer periodNumber = request.getPeriodNumber() != null
                ? request.getPeriodNumber() : entry.getPeriodNumber();
        Long classId = request.getClassId() != null
                ? request.getClassId() : entry.getSchoolClass().getId();
        Long teacherId = request.getTeacherId() != null
                ? request.getTeacherId() : entry.getTeacher().getId();

        validatePeriodRange(periodNumber);

        boolean slotChanged = !day.equals(entry.getDay())
                || !periodNumber.equals(entry.getPeriodNumber())
                || !classId.equals(entry.getSchoolClass().getId());
        boolean teacherSlotChanged = !day.equals(entry.getDay())
                || !periodNumber.equals(entry.getPeriodNumber())
                || !teacherId.equals(entry.getTeacher().getId());

        if (slotChanged) {
            checkClassConflictExcluding(classId, day, periodNumber, id);
        }
        if (teacherSlotChanged) {
            checkTeacherConflictExcluding(teacherId, day, periodNumber, id);
        }

        if (request.getClassId() != null) {
            SchoolClass schoolClass = schoolClassRepository.findById(request.getClassId())
                    .orElseThrow(() -> new RuntimeException(
                            "SchoolClass not found with id: " + request.getClassId()));
            entry.setSchoolClass(schoolClass);
        }
        if (request.getSubjectId() != null) {
            Subject subject = subjectRepository.findById(request.getSubjectId())
                    .orElseThrow(() -> new RuntimeException(
                            "Subject not found with id: " + request.getSubjectId()));
            entry.setSubject(subject);
        }
        if (request.getTeacherId() != null) {
            Teacher teacher = teacherRepository.findById(request.getTeacherId())
                    .orElseThrow(() -> new RuntimeException(
                            "Teacher not found with id: " + request.getTeacherId()));
            entry.setTeacher(teacher);
        }
        entry.setDay(day);
        entry.setPeriodNumber(periodNumber);

        return timeTableRepository.save(entry);
    }

    private void validatePeriodRange(Integer periodNumber) {
        if (periodNumber == null || periodNumber < MIN_PERIOD || periodNumber > MAX_PERIOD) {
            throw new RuntimeException(
                    "periodNumber must be between " + MIN_PERIOD + " and " + MAX_PERIOD);
        }
    }

    private void checkClassConflict(Long classId, DayOfWeekEnum day, Integer periodNumber) {
        timeTableRepository.findBySchoolClass_IdAndDayAndPeriodNumber(classId, day, periodNumber)
                .ifPresent(existing -> {
                    throw new RuntimeException(
                            "Class already has a subject scheduled on " + day
                                    + " period " + periodNumber);
                });
    }

    private void checkTeacherConflict(Long teacherId, DayOfWeekEnum day, Integer periodNumber) {
        timeTableRepository.findByTeacher_IdAndDayAndPeriodNumber(teacherId, day, periodNumber)
                .ifPresent(existing -> {
                    throw new RuntimeException(
                            "Teacher is already scheduled on " + day
                                    + " period " + periodNumber);
                });
    }

    private void checkClassConflictExcluding(Long classId, DayOfWeekEnum day,
                                             Integer periodNumber, Long excludeId) {
        timeTableRepository.findBySchoolClass_IdAndDayAndPeriodNumber(classId, day, periodNumber)
                .filter(existing -> !existing.getId().equals(excludeId))
                .ifPresent(existing -> {
                    throw new RuntimeException(
                            "Class already has a subject scheduled on " + day
                                    + " period " + periodNumber);
                });
    }

    private void checkTeacherConflictExcluding(Long teacherId, DayOfWeekEnum day,
                                               Integer periodNumber, Long excludeId) {
        timeTableRepository.findByTeacher_IdAndDayAndPeriodNumber(teacherId, day, periodNumber)
                .filter(existing -> !existing.getId().equals(excludeId))
                .ifPresent(existing -> {
                    throw new RuntimeException(
                            "Teacher is already scheduled on " + day
                                    + " period " + periodNumber);
                });
    }

    public List<TimeTable> getAllEntries() {
        return timeTableRepository.findAll();
    }

    public TimeTable getEntryById(Long id) {
        return timeTableRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("TimeTable entry not found with id: " + id));
    }

    public List<TimeTable> getByClass(Long classId) {
        return timeTableRepository.findBySchoolClass_Id(classId);
    }

    public List<TimeTable> getByClassAndDay(Long classId, DayOfWeekEnum day) {
        return timeTableRepository.findBySchoolClass_IdAndDay(classId, day);
    }

    public List<TimeTable> getByTeacher(Long teacherId) {
        return timeTableRepository.findByTeacher_Id(teacherId);
    }

    public List<TimeTable> getByTeacherAndDay(Long teacherId, DayOfWeekEnum day) {
        return timeTableRepository.findByTeacher_IdAndDay(teacherId, day);
    }

    public void deleteEntry(Long id) {
        timeTableRepository.deleteById(id);
    }
}