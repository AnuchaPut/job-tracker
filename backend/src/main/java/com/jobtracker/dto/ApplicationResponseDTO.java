package com.jobtracker.dto;

import com.jobtracker.model.Application;
import com.jobtracker.model.ApplicationStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class ApplicationResponseDTO {

    private Long id;
    private String company;
    private String role;
    private ApplicationStatus status;
    private LocalDate dateApplied;
    private String jobUrl;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static ApplicationResponseDTO fromEntity(Application app) {
        ApplicationResponseDTO dto = new ApplicationResponseDTO();
        dto.setId(app.getId());
        dto.setCompany(app.getCompany());
        dto.setRole(app.getRole());
        dto.setStatus(app.getStatus());
        dto.setDateApplied(app.getDateApplied());
        dto.setJobUrl(app.getJobUrl());
        dto.setNotes(app.getNotes());
        dto.setCreatedAt(app.getCreatedAt());
        dto.setUpdatedAt(app.getUpdatedAt());
        return dto;
    }
}
