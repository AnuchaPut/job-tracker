package com.jobtracker.controller;

import com.jobtracker.dto.LoginResponse;
import com.jobtracker.dto.UserRequest;
import com.jobtracker.dto.UserResponse;
import com.jobtracker.repository.UserRepository;
import com.jobtracker.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService service;
    private final UserRepository userRepository;

    public AuthController(UserService service, UserRepository userRepository) {
        this.service = service;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public UserResponse createUser(@Valid @RequestBody UserRequest user) {
        return service.createUser(user);
    }

    @PostMapping("/login")
    public LoginResponse Login(@RequestBody UserRequest user) {
        return service.login(user);
    }

}
