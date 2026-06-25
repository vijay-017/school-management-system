package com.backend.backend.services;

import com.backend.backend.entity.Teacher;
import com.backend.backend.entity.User;
import com.backend.backend.repository.TeacherRepository;
import com.backend.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TeacherService{

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private UserRepository userRepository;

    //get teacher by Id
    public Teacher getByEmployeeId(String employeeId){
        return teacherRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));
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
    public Teacher updateTeacher(String employeeId, Teacher updatedTeacher){
        Teacher existingTeacher = teacherRepository.findByEmployeeId(employeeId).orElse(null);
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
    @Transactional
    public void deleteTeacher(String employeeId){
        Teacher teacher = teacherRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        User user = teacher.getUser();

        teacherRepository.deleteByEmployeeId(employeeId);

        if (user != null) {
            userRepository.delete(user);
        }
    }

}