package com.backend.backend.controller;

import com.backend.backend.entity.Parent;
import com.backend.backend.services.ParentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/parent")
public class ParentController {

    @Autowired
    private ParentService parentService;

    // Get All Parents
    @GetMapping
    public List<Parent> getAllParents() {
        return parentService.getAllParents();
    }

    // Get Parent by Phone
    @GetMapping("/{phone}")
    public Parent getParentByPhone(@PathVariable String phone) {
        return parentService.getParentByPhone(phone);
    }

    // Create Parent
    @PostMapping
    public Parent createParent(@RequestBody Parent parent) {
        return parentService.createParent(parent);
    }

    // Update Parent
    @PutMapping("/{id}")
    public Parent updateParent(@PathVariable Long id,
                               @RequestBody Parent parent) {
        return parentService.updateParent(id, parent);
    }

    // Delete Parent
    @DeleteMapping("/{id}")
    public void deleteParent(@PathVariable Long id) {
        parentService.deleteParent(id);
    }

}