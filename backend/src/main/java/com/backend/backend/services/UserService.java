package com.backend.backend.services;

import com.backend.backend.entity.User;
import com.backend.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService{

    @Autowired
    private UserRepository userRepository;

    //get user by Id
    public User getById(Long id){
        return userRepository.findById(id).orElse(null);
    }

    //get all users
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    //create new user
    public User createUser(User newUser){
        return userRepository.save(newUser);
    }

    //update existing user
    public User updateUser(Long id, User updatedUser){
        User existingUser = userRepository.findById(id).orElse(null);
        if(existingUser != null){
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setRole(updatedUser.getRole());
            existingUser.setIsActive(updatedUser.getIsActive());
            existingUser.setUsername(updatedUser.getUsername());
            existingUser.setMobileNumber(updatedUser.getMobileNumber());
            return userRepository.save(existingUser);
        }
        return null;
    }

    //delete user
    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }

}