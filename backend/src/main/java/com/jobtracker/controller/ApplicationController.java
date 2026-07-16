package com.jobtracker.controller;

import com.jobtracker.dto.ApplicationRequestDTO;
import com.jobtracker.dto.ApplicationResponseDTO;
import com.jobtracker.model.ApplicationStatus;
import com.jobtracker.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:5173")
public class ApplicationController {

    private final ApplicationService service;

    public ApplicationController(ApplicationService service) {
        this.service = service;
    }

    @GetMapping
    public List<ApplicationResponseDTO> getAll(@RequestParam(required = false) ApplicationStatus status) {
        if (status != null) {
            return service.getByStatus(status);
        }
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ApplicationResponseDTO getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApplicationResponseDTO create(@Valid @RequestBody ApplicationRequestDTO dto) {
        return service.create(dto);
    }

    @PutMapping("/{id}")
    public ApplicationResponseDTO update(@PathVariable Long id, @Valid @RequestBody ApplicationRequestDTO dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
