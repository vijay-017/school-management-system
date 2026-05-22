
@RestController
public class TeacherController{

    @Autowired
    private TeacherService teacherService;

    //get teacher by Id
    @GetMapping("/teacher/{id}")
    public Teacher getTeacherById(@PathVariable Long id){
        return teacherService.getById(id);
    }

    //get all teachers
    @GetMapping("/teacher")
    public List<Teacher> getAllTeachers(){
        return teacherService.getAllTeachers();
    }

    //create new teacher
    @PostMapping("/teacher")
    public Teacher createTeacher(@RequestBody Teacher teacher){
        return teacherService.createTeacher(teacher);
    }

    //update existing teacher
    @PutMapping("/teacher/{id}")
    public Teacher updateTeacher(@PathVariable Long id, @RequestBody Teacher teacher){
        return teacherService.updateTeacher(id, teacher);
    }

    //delete teacher
    @DeleteMapping("/teacher/{id}")
    public void deleteTeacher(@PathVariable Long id){
        teacherService.deleteTeacher(id);
    }

}   