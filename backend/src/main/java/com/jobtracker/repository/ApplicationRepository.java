package com.jobtracker.repository;

import com.jobtracker.model.Application;
import com.jobtracker.model.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    // Spring Data JPA generates the query from the method name — no SQL needed here.
    // Try writing the equivalent raw SQL yourself as practice: it's good interview prep.
    List<Application> findByStatus(ApplicationStatus status);
}
