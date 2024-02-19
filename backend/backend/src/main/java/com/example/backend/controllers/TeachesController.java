package com.example.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.TeachesRepo;
import com.example.backend.models.Subject;

@RestController
@RequestMapping("/teaches")
@CrossOrigin(origins = "http://localhost:4200/")
public class TeachesController {
    
    @GetMapping("/getSubjects")
    public List<String> getSubjects() {
        return new TeachesRepo().getSubjects();
    }

    @PostMapping("/getAllTutorForSubject")
    public List<String> getAllTutorForSubject(@RequestBody String subject) {
        return new TeachesRepo().getAllTutorForSubject(subject);
    }

    @PostMapping("/getAllSubjectsForTutor")
    public List<Subject> getAllSubjectsForTutor(@RequestBody String username) {
        return new TeachesRepo().getAllSubjectsForTutor(username);
    }

    @PostMapping("/add")
    public int add(@RequestBody String[] data) {
        return new TeachesRepo().add(data[0], data[1]);
    }

    @PostMapping("/remove")
    public int remove(@RequestBody String[] data) {
        return new TeachesRepo().remove(data[0], data[1]);
    }

    @GetMapping("/getCountForSubjects")
    public List<Integer> getCountForSubjects() {
        return new TeachesRepo().getCountForSubjects();
    }
    
    

}
