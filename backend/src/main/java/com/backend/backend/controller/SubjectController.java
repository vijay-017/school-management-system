package com.backend.backend.controller;

import com.backend.backend.entity.Subject;
import com.backend.backend.services.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SubjectController{

    @Autowired
    private SubjectService subjectService;

    //get subject by Id
    @GetMapping("/subject/{id}")
    public Subject getSubjectById(@PathVariable Long id){
        return subjectService.getById(id);
    }

    //get all subjects
    @GetMapping("/subject")
    public List<Subject> getAllSubjects(){
        return subjectService.getAllSubjects();
    }

    //create new subject
    @PostMapping("/subject")
    public Subject createSubject(@RequestBody Subject subject){
        return subjectService.createSubject(subject);
    }

    //update existing subject
    @PutMapping("/subject/{id}")
    public Subject updateSubject(@PathVariable Long id, @RequestBody Subject subject){
        return subjectService.updateSubject(id, subject);
    }

    //delete subject
    @DeleteMapping("/subject/{id}")
    public void deleteSubject(@PathVariable Long id){
        subjectService.deleteSubject(id);
    }

}