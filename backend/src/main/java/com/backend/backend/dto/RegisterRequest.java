package com.backend.backend.dto;

import com.backend.backend.entity.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {
    private String username;
    private String password;
    private String email;
    private String mobileNumber;
    private Role role;
}