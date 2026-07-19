package com.jobtracker.repository;

import com.jobtracker.model.Application;
import com.jobtracker.model.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import com.jobtracker.model.User;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    Optional<Application> findByIdAndUser(Long id, User user);
    List<Application> findByUserAndStatus(
            User user,
            ApplicationStatus status
    );
    List<Application> findByUser(User user);
}
