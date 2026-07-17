package com.jobtracker.dto;

import com.jobtracker.model.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {
    
    private String username;
    private String email;
    private Role role;

    public UserResponse(String username, String email, Role role) {
        this.username = username;
        this.email = email;
        this.role = role;
    }

}
