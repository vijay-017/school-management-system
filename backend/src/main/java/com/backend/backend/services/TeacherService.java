

@Service
public class TeacherService{

    @Autowired
    private TeacherRepository teacherRepository;

    //get teacher by Id
    Teacher getById(Long id){
        return teacherRepository.findById(id).orElse(null);
    }

    //get all teachers
    List<Teacher> getAllTeachers(){
        return teacherRepository.findAll();
    }

    //create new teacher
    Teacher createTeacher(Teacher newTeacher){
        return teacherRepository.save(newTeacher);
    }

    //update existing teacher
    Teacher updateTeacher(Long id, Teacher updatedTeacher){
        Teacher existingTeacher = teacherRepository.findById(id).orElse(null);
        if(existingTeacher){
            existingTeacher.setName(updatedTeacher.getName());
            existingTeacher.setEmployeeId(updatedTeacher.getEmployeeId());
            existingTeacher.setGender(updatedTeacher.getGender());
            existingTeacher.setDateOfBirth(updatedTeacher.getDateOfBirth());
            existingTeacher.setPhone(updatedTeacher.getPhone());
            existingTeacher.setAddress(updatedTeacher.getAddress());
            existingTeacher.setSubject(updatedTeacher.getSubject());
            existingTeacher.setJoiningDate(updatedTeacher.getJoiningDate());
            return teacherRepository.save(existingTeacher);
        }
    }

    //delete teacher
    void deleteTeacher(Long id){
        teacherRepository.deleteById(id);
    }

}