
@Service
public class SubjectService{

    @Autowired
    private SubjectRepository subjectRepository;

    //get subject by Id
    Subject getById(Long id){
        return subjectRepository.findById(id).orElse(null);
    }

    //get all subjects
    List<Subject> getAllSubjects(){
        return subjectRepository.findAll();
    }

    //create new subject
    Subject createSubject(Subject newSubject){
        return subjectRepository.save(newSubject);
    }

    //update existing subject
    Subject updateSubject(Long id, Subject updatedSubject){
        Subject existingSubject = subjectRepository.findById(id).orElse(null);
        if(existingSubject){
            existingSubject.setName(updatedSubject.getName());
            existingSubject.setTeacher(updatedSubject.getTeacher());
            return subjectRepository.save(existingSubject);
        }
    }

    //delete subject
    void deleteSubject(Long id){
        subjectRepository.deleteById(id);
    }

}