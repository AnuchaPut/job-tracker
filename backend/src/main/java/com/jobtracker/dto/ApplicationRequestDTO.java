package com.jobtracker.dto;

import com.jobtracker.model.ApplicationStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

// What the client SENDS to create/update an application.
// Kept separate from the entity so the API shape can evolve independently of the DB.
@Getter
@Setter
public class ApplicationRequestDTO {

    @NotBlank(message = "Company is required")
    private String company;

    @NotBlank(message = "Role is required")
    private String role;

    private ApplicationStatus status;

    private LocalDate dateApplied;

    private String jobUrl;

    private String notes;
}
