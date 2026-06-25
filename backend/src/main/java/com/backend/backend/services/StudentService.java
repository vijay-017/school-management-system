package com.backend.backend.services;

import com.backend.backend.entity.Student;
import com.backend.backend.entity.User;
import com.backend.backend.repository.StudentRepository;
import com.backend.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StudentService {
    
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    //get student by RollNumber
    public Student getByRollNumber(String rollNumber){
        return studentRepository.findByRollNumber(rollNumber)
                .orElseThrow(() -> new RuntimeException("Student not found"));
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
    public Student updateStudent(String rollNumber, Student updatedStudent){
        Student existingStudent = studentRepository.findByRollNumber(rollNumber).orElse(null);
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
    @Transactional
    public Student deleteStudent(String rollNumber) {

        Student student = studentRepository.findByRollNumber(rollNumber)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        User user = student.getUser();

        studentRepository.deleteByRollNumber(rollNumber);

        if (user != null) {
            userRepository.delete(user);
        }

        return student;
    }

}