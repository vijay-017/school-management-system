

@Service
public class AttendanceService{

    @Autowired
    private AttendanceRepository attendanceRepository;

    //get attendance by Id
    Attendance getById(Long id){
        return attendanceRepository.findById(id).orElse(null);
    }

    //get all attendances
    List<Attendance> getAllAttendances(){
        return attendanceRepository.findAll();
    }

    //create new attendance
    Attendance createAttendance(Attendance newAttendance){
        return attendanceRepository.save(newAttendance);
    }

    //update existing attendance
    Attendance updateAttendance(Long id, Attendance updatedAttendance){
        Attendance existingAttendance = attendanceRepository.findById(id).orElse(null);
        if(existingAttendance){
            existingAttendance.setDate(updatedAttendance.getDate());
            existingAttendance.setStatus(updatedAttendance.getStatus());
            existingAttendance.setStudent(updatedAttendance.getStudent());
            return attendanceRepository.save(existingAttendance);
        }
    }

    //delete attendance
    void deleteAttendance(Long id){
        attendanceRepository.deleteById(id);
    }

}