package com.backend.backend.controller;

import com.backend.backend.entity.User;
import com.backend.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController{

    @Autowired
    private UserService userService;

    //get user by Id
    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable Long id){
        return userService.getById(id);
    }

    //get all users
    @GetMapping("/user")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    //create new user
    @PostMapping("/user")
    public User createUser(@RequestBody User user){
        return userService.createUser(user);
    }

    //update existing user
    @PutMapping("/user/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user){
        return userService.updateUser(id, user);
    }

    //delete user
    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
    }

}