
@Service
public class SchoolClassService{
    
    @Autowired
    private SchoolClassRepository schoolClassRepository;

    //get school class by Id
    SchoolClass getById(Long id){
        return schoolClassRepository.findById(id).orElse(null);
    }

    //get all school classes
    List<SchoolClass> getAllSchoolClasses(){
        return schoolClassRepository.findAll();
    }

    //create new school class
    SchoolClass createSchoolClass(SchoolClass newSchoolClass){
        return schoolClassRepository.save(newSchoolClass);
    }

    //update existing school class
    SchoolClass updateSchoolClass(Long id, SchoolClass updatedSchoolClass){
        SchoolClass existingSchoolClass = schoolClassRepository.findById(id).orElse(null);
        if(existingSchoolClass){
            existingSchoolClass.setClassName(updatedSchoolClass.getClassName());
            existingSchoolClass.setTeacher(updatedSchoolClass.getTeacher());
            return schoolClassRepository.save(existingSchoolClass);
        }
    }

    //delete school class
    void deleteSchoolClass(Long id){
        schoolClassRepository.deleteById(id);
    }
    
}