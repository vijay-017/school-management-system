package com.backend.backend.controller;

import com.backend.backend.entity.Student;
import com.backend.backend.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StudentController{

    @Autowired
    private StudentService studentService;

    //get student by Id
    @GetMapping("/student/{rollNumber}")
    public Student getByRollNumber(@PathVariable String rollNumber){
        return studentService.getByRollNumber(rollNumber);
    }

    //get all students
    @GetMapping("/student")
    public List<Student> getAllStudents(){
        return studentService.getAllStudents();
    }

    //create new student
    @PostMapping("/student")
    public Student createStudent(@RequestBody Student student){
        return studentService.createStudent(student);
    }

    //update existing student
    @PutMapping("/student/{rollNumber}")
    public Student updateStudent(@PathVariable String rollNumber, @RequestBody Student student){
        return studentService.updateStudent(rollNumber, student);
    }

    //delete student
    @DeleteMapping("/student/{rollNumber}")
    public Student deleteStudent(@PathVariable String rollNumber){
        return studentService.deleteStudent(rollNumber);
    }

}