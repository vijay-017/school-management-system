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
    @GetMapping("/student/{id}")
    public Student getByRollNumber(@PathVariable String id){
        return studentService.getByRollNumber(id);
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
    @PutMapping("/student/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student student){
        return studentService.updateStudent(id, student);
    }

    //delete student
    @DeleteMapping("/student/{id}")
    public void deleteStudent(@PathVariable Long id){
        studentService.deleteStudent(id);
    }

}