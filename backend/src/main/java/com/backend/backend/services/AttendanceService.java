package com.backend.backend.services;

import com.backend.backend.entity.Attendance;
import com.backend.backend.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttendanceService{

    @Autowired
    private AttendanceRepository attendanceRepository;

    //get attendance by Id
    public Attendance getById(Long id){
        return attendanceRepository.findById(id).orElse(null);
    }

    //get all attendances
    public List<Attendance> getAllAttendances(){
        return attendanceRepository.findAll();
    }

    //create new attendance
    public Attendance createAttendance(Attendance newAttendance){
        return attendanceRepository.save(newAttendance);
    }

    //update existing attendance
    public Attendance updateAttendance(Long id, Attendance updatedAttendance){
        Attendance existingAttendance = attendanceRepository.findById(id).orElse(null);
        if(existingAttendance != null){
            existingAttendance.setDate(updatedAttendance.getDate());
            existingAttendance.setStatus(updatedAttendance.getStatus());
            existingAttendance.setStudent(updatedAttendance.getStudent());
            return attendanceRepository.save(existingAttendance);
        }
        return null;
    }

    //delete attendance
    public void deleteAttendance(Long id){
        attendanceRepository.deleteById(id);
    }

}