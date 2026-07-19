package com.jobtracker.controller;

import com.jobtracker.dto.ApplicationRequestDTO;
import com.jobtracker.dto.ApplicationResponseDTO;
import com.jobtracker.model.ApplicationStatus;
import com.jobtracker.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import com.jobtracker.model.User;
import com.jobtracker.repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = {"http://localhost:5173", "https://job-tracker-pink-alpha.vercel.app"})
public class ApplicationController {

    private final ApplicationService service;
    private final UserRepository userRepository;

    public ApplicationController(ApplicationService service, UserRepository userRepository) {
        this.service = service;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<ApplicationResponseDTO> getAll(@RequestParam(required = false) ApplicationStatus status, @AuthenticationPrincipal UserDetails userDetails) {

         User user = userRepository
            .findByEmail(userDetails.getUsername())
            .orElseThrow();

        if (status != null) {
            return service.getByStatus(status, user);
        }
        return service.getAll(user);
    }

    @GetMapping("/{id}")
    public ApplicationResponseDTO getById(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return service.getById(id, user);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApplicationResponseDTO create(@Valid @RequestBody ApplicationRequestDTO dto, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return service.create(dto, user);
    }

    @PutMapping("/{id}")
    public ApplicationResponseDTO update(@PathVariable Long id, @Valid @RequestBody ApplicationRequestDTO dto, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return service.update(id, dto, user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        service.delete(id, user);
        return ResponseEntity.noContent().build();
    }
}
