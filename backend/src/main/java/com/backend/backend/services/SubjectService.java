package com.backend.backend.services;

import com.backend.backend.entity.Subject;
import com.backend.backend.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService{

    @Autowired
    private SubjectRepository subjectRepository;

    //get subject by Id
    public Subject getById(Long id){
        return subjectRepository.findById(id).orElse(null);
    }

    //get all subjects
    public List<Subject> getAllSubjects(){
        return subjectRepository.findAll();
    }

    //create new subject
    public Subject createSubject(Subject newSubject){
        return subjectRepository.save(newSubject);
    }

    //update existing subject
    public Subject updateSubject(Long id, Subject updatedSubject){
        Subject existingSubject = subjectRepository.findById(id).orElse(null);
        if(existingSubject != null){
            existingSubject.setSubjectName(updatedSubject.getSubjectName());
            existingSubject.setSubjectCode(updatedSubject.getSubjectCode());
            return subjectRepository.save(existingSubject);
        }
        return null;
    }

    //delete subject
    public void deleteSubject(Long id){
        subjectRepository.deleteById(id);
    }

}