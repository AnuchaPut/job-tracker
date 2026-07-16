package com.jobtracker.dto;

import com.jobtracker.model.ApplicationStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

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
