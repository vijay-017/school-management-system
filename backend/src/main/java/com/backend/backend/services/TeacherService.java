package com.backend.backend.services;

import com.backend.backend.entity.Teacher;
import com.backend.backend.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService{

    @Autowired
    private TeacherRepository teacherRepository;

    //get teacher by Id
    public Teacher getById(Long id){
        return teacherRepository.findById(id).orElse(null);
    }

    //get all teachers
    public List<Teacher> getAllTeachers(){
        return teacherRepository.findAll();
    }

    //create new teacher
    public Teacher createTeacher(Teacher newTeacher){
        return teacherRepository.save(newTeacher);
    }

    //update existing teacher
    public Teacher updateTeacher(Long id, Teacher updatedTeacher){
        Teacher existingTeacher = teacherRepository.findById(id).orElse(null);
        if(existingTeacher != null){
            existingTeacher.setEmployeeId(updatedTeacher.getEmployeeId());
            existingTeacher.setFirstName(updatedTeacher.getFirstName());
            existingTeacher.setLastName(updatedTeacher.getLastName());
            existingTeacher.setQualification(updatedTeacher.getQualification());
            existingTeacher.setExperienceYears(updatedTeacher.getExperienceYears());
            existingTeacher.setPhone(updatedTeacher.getPhone());
            existingTeacher.setHireDate(updatedTeacher.getHireDate());
            existingTeacher.setUser(updatedTeacher.getUser());
            return teacherRepository.save(existingTeacher);
        }
        return null;
    }

    //delete teacher
    public void deleteTeacher(Long id){
        teacherRepository.deleteById(id);
    }

}