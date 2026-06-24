package com.backend.backend.services;

import com.backend.backend.entity.Student;
import com.backend.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    
    @Autowired
    private StudentRepository studentRepository;

    //
    public Student getBId(Long id){
        return studentRepository.findById(id).orElse(null);
    }

    //get student by Id
    public Student getByRollNumber(String id){
        return studentRepository.findByRollNumber(id).orElse(null);
    }

    //get all students
    public List<Student> getAllStudents(){
        return studentRepository.findAll();
    }

    //create new student
    public Student createStudent(Student newStudent){
        return studentRepository.save(newStudent);
    }

    //update existing student
    public Student updateStudent(Long id, Student updatedStudent){
        Student existingStudent = studentRepository.findById(id).orElse(null);
        if(existingStudent != null){
            existingStudent.setRollNumber(updatedStudent.getRollNumber());
            existingStudent.setFirstName(updatedStudent.getFirstName());
            existingStudent.setLastName(updatedStudent.getLastName());
            existingStudent.setGender(updatedStudent.getGender());
            existingStudent.setDateOfBirth(updatedStudent.getDateOfBirth());
            existingStudent.setPhone(updatedStudent.getPhone());
            existingStudent.setAddress(updatedStudent.getAddress());
            existingStudent.setSchoolClass(updatedStudent.getSchoolClass());
            existingStudent.setAdmissionDate(updatedStudent.getAdmissionDate());
            return studentRepository.save(existingStudent);
        }
        return null;
    }

    //delete student
    public void deleteStudent(Long id){
        studentRepository.deleteById(id);
    }

}