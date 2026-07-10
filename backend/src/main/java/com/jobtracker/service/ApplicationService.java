package com.jobtracker.service;

import com.jobtracker.dto.ApplicationRequestDTO;
import com.jobtracker.dto.ApplicationResponseDTO;
import com.jobtracker.exception.ResourceNotFoundException;
import com.jobtracker.model.Application;
import com.jobtracker.model.ApplicationStatus;
import com.jobtracker.repository.ApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

// Business logic lives here, not in the controller.
// Controller = HTTP concerns. Service = actual logic. Repository = DB access.
@Service
public class ApplicationService {

    private final ApplicationRepository repository;

    public ApplicationService(ApplicationRepository repository) {
        this.repository = repository;
    }

    public List<ApplicationResponseDTO> getAll() {
        return repository.findAll()
                .stream()
                .map(ApplicationResponseDTO::fromEntity)
                .toList();
    }

    public List<ApplicationResponseDTO> getByStatus(ApplicationStatus status) {
        return repository.findByStatus(status)
                .stream()
                .map(ApplicationResponseDTO::fromEntity)
                .toList();
    }

    public ApplicationResponseDTO getById(Long id) {
        Application app = findOrThrow(id);
        return ApplicationResponseDTO.fromEntity(app);
    }

    public ApplicationResponseDTO create(ApplicationRequestDTO dto) {
        Application app = new Application();
        applyDtoToEntity(dto, app);
        Application saved = repository.save(app);
        return ApplicationResponseDTO.fromEntity(saved);
    }

    public ApplicationResponseDTO update(Long id, ApplicationRequestDTO dto) {
        Application app = findOrThrow(id);
        applyDtoToEntity(dto, app);
        Application saved = repository.save(app);
        return ApplicationResponseDTO.fromEntity(saved);
    }

    public void delete(Long id) {
        Application app = findOrThrow(id);
        repository.delete(app);
    }

    private Application findOrThrow(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id " + id));
    }

    private void applyDtoToEntity(ApplicationRequestDTO dto, Application app) {
        app.setCompany(dto.getCompany());
        app.setRole(dto.getRole());
        app.setStatus(dto.getStatus() != null ? dto.getStatus() : ApplicationStatus.APPLIED);
        app.setDateApplied(dto.getDateApplied());
        app.setJobUrl(dto.getJobUrl());
        app.setNotes(dto.getNotes());
    }
}
