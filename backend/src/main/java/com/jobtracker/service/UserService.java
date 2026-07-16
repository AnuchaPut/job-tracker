package com.jobtracker.service;

import com.jobtracker.dto.LoginResponse;
import com.jobtracker.model.Role;
import com.jobtracker.security.JwtService;
import org.springframework.stereotype.Service;
import com.jobtracker.repository.UserRepository;
import com.jobtracker.dto.UserRequest;
import com.jobtracker.dto.UserResponse;
import com.jobtracker.model.User;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public UserResponse createUser(UserRequest userRequest) {
        User user = new User();
        user.setUsername(userRequest.getUsername());
        user.setEmail(userRequest.getEmail());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        user.setRole(Role.USER);

        User savedUser = userRepository.save(user);

        return new UserResponse(
                savedUser.getUsername(),
                savedUser.getEmail(),
                savedUser.getRole()
        );
    }

    public LoginResponse login(UserRequest request ) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtService.generateToken(user);

        return new LoginResponse(token);
    }
}