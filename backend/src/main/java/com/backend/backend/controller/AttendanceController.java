package com.backend.backend.controller;

import com.backend.backend.entity.Attendance;
import com.backend.backend.services.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AttendanceController{

    @Autowired
    private AttendanceService attendanceService;

    //get attendance by Id
    @GetMapping("/attendance/{id}")
    public Attendance getAttendanceById(@PathVariable Long id){
        return attendanceService.getById(id);
    }

    //get all attendances
    @GetMapping("/attendance")
    public List<Attendance> getAllAttendances(){
        return attendanceService.getAllAttendances();
    }

    //create new attendance
    @PostMapping("/attendance")
    public Attendance createAttendance(@RequestBody Attendance attendance){
        return attendanceService.createAttendance(attendance);
    }

    //update existing attendance
    @PutMapping("/attendance/{id}")
    public Attendance updateAttendance(@PathVariable Long id, @RequestBody Attendance attendance){
        return attendanceService.updateAttendance(id, attendance);
    }

    //delete attendance
    @DeleteMapping("/attendance/{id}")
    public void deleteAttendance(@PathVariable Long id){
        attendanceService.deleteAttendance(id);
    }

}