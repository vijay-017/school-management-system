
@Service
public class UserService{

    @Autowired
    private UserRepository userRepository;

    //get user by Id
    User getById(Long id){
        return userRepository.findById(id).orElse(null);
    }

    //get all users
    List<User> getAllUsers(){
        return userRepository.findAll();
    }

    //create new user
    User createUser(User newUser){
        return userRepository.save(newUser);
    }

    //update existing user
    User updateUser(Long id, User updatedUser){
        User existingUser = userRepository.findById(id).orElse(null);
        if(existingUser){
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setRole(updatedUser.getRole());
            existingUser.setActive(updatedUser.isActive());
            return userRepository.save(existingUser);
        }
    }

    //delete user
    void deleteUser(Long id){
        userRepository.deleteById(id);
    }

}