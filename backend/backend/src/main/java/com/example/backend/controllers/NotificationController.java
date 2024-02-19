package com.example.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.NotificationRepo;
import com.example.backend.models.Notification;

@RestController
@RequestMapping("/notifications")
@CrossOrigin(origins = "http://localhost:4200/")
public class NotificationController {
    
    @PostMapping("/getAllSeenForStudent")
    public List<Notification> getAllSeenForStudent(@RequestBody String student) {
        return new NotificationRepo().getAllSeenForStudent(student);
    }

    @PostMapping("/getAllNewForStudent")
    public List<Notification> getAllNewForStudent(@RequestBody String student) {
        return new NotificationRepo().getAllNewForStudent(student);
    }

    @PostMapping("/add")
    public int add(@RequestBody Notification n) {
        return new NotificationRepo().add(n);
    }

    @PostMapping("/seen")
    public int seen(@RequestBody int id) {
        return new NotificationRepo().seen(id);
    }

}
