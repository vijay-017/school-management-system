package com.backend.backend.services;

import com.backend.backend.entity.Parent;
import com.backend.backend.repository.ParentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParentService {

    @Autowired
    private ParentRepository parentRepository;

    // Get All Parents
    public List<Parent> getAllParents() {
        return parentRepository.findAll();
    }

    // Get Parent by Phone
    public Parent getParentByPhone(String phone) {
        return parentRepository.findByPhone(phone).orElse(null);
    }

    // Create Parent
    public Parent createParent(Parent parent) {
        return parentRepository.save(parent);
    }

    // Update Parent
    public Parent updateParent(Long id, Parent updatedParent) {

        Parent existingParent = parentRepository.findById(id).orElse(null);

        if (existingParent != null) {

            existingParent.setFatherName(updatedParent.getFatherName());
            existingParent.setMotherName(updatedParent.getMotherName());
            existingParent.setPhone(updatedParent.getPhone());
            existingParent.setEmail(updatedParent.getEmail());
            existingParent.setOccupation(updatedParent.getOccupation());
            existingParent.setAddress(updatedParent.getAddress());

            return parentRepository.save(existingParent);
        }

        return null;
    }

    // Delete Parent
    public void deleteParent(Long id) {
        parentRepository.deleteById(id);
    }

}