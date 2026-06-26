package com.backend.backend.services;

import com.backend.backend.entity.SchoolClass;
import com.backend.backend.repository.SchoolClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import java.util.List;

@Service
public class SchoolClassService{
    
    @Autowired
    private SchoolClassRepository schoolClassRepository;

    //get school class by Id
    public SchoolClass getById(Long id){
        return schoolClassRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Class Not Found"));
    }

    //get all school classes
    public List<SchoolClass> getAllSchoolClasses(){
        return schoolClassRepository.findAll();
    }

    //create new school class
    public SchoolClass createSchoolClass(SchoolClass newSchoolClass){
        return schoolClassRepository.save(newSchoolClass);
    }

    //update existing school class
    public SchoolClass updateSchoolClass(Long id, SchoolClass updatedSchoolClass){
        SchoolClass existingSchoolClass = schoolClassRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Class Not Found"));
        if(existingSchoolClass != null){
            existingSchoolClass.setClassName(updatedSchoolClass.getClassName());
            existingSchoolClass.setSection(updatedSchoolClass.getSection());
            existingSchoolClass.setClassTeacher(updatedSchoolClass.getClassTeacher());
            existingSchoolClass.setCapacity(updatedSchoolClass.getCapacity());
            existingSchoolClass.setRoomNumber(updatedSchoolClass.getRoomNumber());
            return schoolClassRepository.save(existingSchoolClass);
        }
        return null;
    }

    //delete school class
    public void deleteSchoolClass(Long id){
        schoolClassRepository.deleteById(id);
    }
    
}