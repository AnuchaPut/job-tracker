package com.jobtracker.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @PostMapping("/test")
    public String adminPage() {
        return "adminPage"; 
    }
}
