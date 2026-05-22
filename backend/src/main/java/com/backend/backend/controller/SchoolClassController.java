
@RestController
public class SchoolClassController{

    @Autowired
    private SchoolClassService schoolClassService;

    //get school class by Id
    @GetMapping("/school-class/{id}")
    public SchoolClass getSchoolClassById(@PathVariable Long id){
        return schoolClassService.getById(id);
    }

    //get all school classes
    @GetMapping("/school-class")
    public List<SchoolClass> getAllSchoolClasses(){
        return schoolClassService.getAllSchoolClasses();
    }

    //create new school class
    @PostMapping("/school-class")
    public SchoolClass createSchoolClass(@RequestBody SchoolClass schoolClass){
        return schoolClassService.createSchoolClass(schoolClass);
    }

    //update existing school class
    @PutMapping("/school-class/{id}")
    public SchoolClass updateSchoolClass(@PathVariable Long id, @RequestBody SchoolClass schoolClass){
        return schoolClassService.updateSchoolClass(id, schoolClass);
    }

    //delete school class
    @DeleteMapping("/school-class/{id}")
    public void deleteSchoolClass(@PathVariable Long id){
        schoolClassService.deleteSchoolClass(id);
    }

}