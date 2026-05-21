
@Service
public class StudentService {
    
    @Autowired
    private StudentRepository studentRepository;

    //get student by Id
    Student getById(Long id){
        return studentRepository.findById(id).orElse(null);
    }

    //get all students
    List<Student> getAllStudents(){
        return studentRepository.findAll();
    }

    //create new student
    Student createStudent(Student newStudent){
        return studentRepository.save(newStudent);
    }

    //update existing student
    Student updateStudent(Long id, Student){
        Student existingStudent = studentRepository.findById(id).orElse(null);
        if(existingStudent){
            existingStudent.setName(updatedStudent.getName());
            existingStudent.setRollNumber(updatedStudent.getRollNumber());
            existingStudent.setGender(updatedStudent.getGender());
            existingStudent.setDateOfBirth(updatedStudent.getDateOfBirth());
            existingStudent.setPhone(updatedStudent.getPhone());
            existingStudent.setAddress(updatedStudent.getAddress());
            existingStudent.setSchoolClass(updatedStudent.getSchoolClass());
            existingStudent.setAdmissionDate(updatedStudent.getAdmissionDate());
            return studentRepository.save(existingStudent);
        }
    }

    //delete student
    void deleteStudent(Long id){
        studentRepository.deleteById(id);
    }

}