package com.example.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.SubjectRepo;
import com.example.backend.models.Subject;

@RestController
@RequestMapping("/subjects")
@CrossOrigin(origins = "http://localhost:4200/")
public class SubjectController {
    
    @GetMapping("/getAll")
    public List<Subject> getAll() {
        return new SubjectRepo().getAll();
    }

    @PostMapping("/add")
    public int add(@RequestBody String subject) {
        return new SubjectRepo().add(subject);
    }


}



