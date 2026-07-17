package com.jobtracker.service;

import com.jobtracker.dto.ApplicationRequestDTO;
import com.jobtracker.dto.ApplicationResponseDTO;
import com.jobtracker.exception.ResourceNotFoundException;
import com.jobtracker.model.Application;
import com.jobtracker.model.ApplicationStatus;
import com.jobtracker.repository.ApplicationRepository;
import org.springframework.stereotype.Service;
import com.jobtracker.model.User; 
import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository repository;

    public ApplicationService(ApplicationRepository repository) {
        this.repository = repository;
    }

    public List<ApplicationResponseDTO> getAll(User user) {
        return repository.findByUser(user)
                .stream()
                .map(ApplicationResponseDTO::fromEntity)
                .toList();
    }

    public List<ApplicationResponseDTO> getByStatus(ApplicationStatus status, User user) {
        return repository.findByUserAndStatus(user, status)
                .stream()
                .map(ApplicationResponseDTO::fromEntity)
                .toList();
    }

    public ApplicationResponseDTO getById(Long id) {
        Application app = findOrThrow(id);
        return ApplicationResponseDTO.fromEntity(app);
    }

    public ApplicationResponseDTO create(ApplicationRequestDTO dto, User user) {
        Application app = new Application();
        applyDtoToEntity(dto, app);
        app.setUser(user);
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
