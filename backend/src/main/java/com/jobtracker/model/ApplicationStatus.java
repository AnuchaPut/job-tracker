package com.jobtracker.model;

// Note: this is deliberately a simple enum for now.
// Week 4: add the Interview entity and relate it to Application.
// Week 5: add User and relate Application to it (each user only sees their own rows).
public enum ApplicationStatus {
    APPLIED,
    INTERVIEWING,
    OFFER,
    REJECTED
}
