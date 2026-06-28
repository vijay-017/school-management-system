package com.backend.backend.controller;

import com.backend.backend.dto.TimeTableRequest;
import com.backend.backend.entity.DayOfWeekEnum;
import com.backend.backend.entity.TimeTable;
import com.backend.backend.services.TimeTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/timetable")
public class TimeTableController {

    @Autowired
    private TimeTableService timeTableService;

    @PostMapping
    public TimeTable createEntry(@RequestBody TimeTableRequest request) {
        return timeTableService.createEntry(request);
    }

    @PutMapping("/{id}")
    public TimeTable updateEntry(@PathVariable Long id, @RequestBody TimeTableRequest request) {
        return timeTableService.updateEntry(id, request);
    }

    @GetMapping
    public List<TimeTable> getAllEntries() {
        return timeTableService.getAllEntries();
    }

    @GetMapping("/{id}")
    public TimeTable getEntryById(@PathVariable Long id) {
        return timeTableService.getEntryById(id);
    }

    @GetMapping("/class/{classId}")
    public List<TimeTable> getByClass(@PathVariable Long classId) {
        return timeTableService.getByClass(classId);
    }

    @GetMapping("/class/{classId}/day/{day}")
    public List<TimeTable> getByClassAndDay(@PathVariable Long classId,
                                            @PathVariable DayOfWeekEnum day) {
        return timeTableService.getByClassAndDay(classId, day);
    }

    @GetMapping("/teacher/{teacherId}")
    public List<TimeTable> getByTeacher(@PathVariable Long teacherId) {
        return timeTableService.getByTeacher(teacherId);
    }

    @GetMapping("/teacher/{teacherId}/day/{day}")
    public List<TimeTable> getByTeacherAndDay(@PathVariable Long teacherId,
                                              @PathVariable DayOfWeekEnum day) {
        return timeTableService.getByTeacherAndDay(teacherId, day);
    }

    @DeleteMapping("/{id}")
    public void deleteEntry(@PathVariable Long id) {
        timeTableService.deleteEntry(id);
    }
}