package com.jobtracker.controller;

import org.springframework.web.bind.annotation.RestController;
import com.jobtracker.dto.UserResponse;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import com.jobtracker.model.User;
import com.jobtracker.repository.UserRepository;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class GetUserCurrent {
    private final UserRepository userRepository;

    public GetUserCurrent(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    @GetMapping("/me")
    public UserResponse getCurrentUser(@AuthenticationPrincipal UserDetails user) {

    User dbUser = userRepository.findByEmail(user.getUsername())
        .orElseThrow();

        return new UserResponse(
            dbUser.getUsername(),
            dbUser.getEmail(),
            dbUser.getRole()
        );
    }
}
