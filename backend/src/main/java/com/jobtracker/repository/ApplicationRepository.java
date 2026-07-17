package com.jobtracker.repository;

import com.jobtracker.model.Application;
import com.jobtracker.model.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import com.jobtracker.model.User;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByUserAndStatus(
            User user,
            ApplicationStatus status
    );
    List<Application> findByUser(User user);
}
