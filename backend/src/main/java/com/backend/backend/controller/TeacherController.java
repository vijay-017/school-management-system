package com.backend.backend.controller;

import com.backend.backend.entity.Teacher;
import com.backend.backend.services.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TeacherController{

    @Autowired
    private TeacherService teacherService;

    //get teacher by Id
    @GetMapping("/teacher/{employeeId}")
    public Teacher getTeacherById(@PathVariable String employeeId){
        return teacherService.getByEmployeeId(employeeId);
    }

    //get all teachers
    @GetMapping("/teacher")
    public List<Teacher> getAllTeachers(){
        return teacherService.getAllTeachers();
    }

    //create new teacher
    @PostMapping("/teacher")
    public Teacher createTeacher(@RequestBody Teacher teacher){
        return teacherService.createTeacher(teacher);
    }

    //update existing teacher
    @PutMapping("/teacher/{employeeId}")
    public Teacher updateTeacher(@PathVariable String employeeId, @RequestBody Teacher teacher){
        return teacherService.updateTeacher(employeeId, teacher);
    }

    //delete teacher
    @DeleteMapping("/teacher/{employeeId}")
    public void deleteTeacher(@PathVariable String employeeId){
        teacherService.deleteTeacher(employeeId);
    }

}