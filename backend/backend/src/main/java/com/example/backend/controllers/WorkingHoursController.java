package com.example.backend.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.WorkingHoursRepo;
import com.example.backend.models.Class;
import com.example.backend.models.WorkingHours;

@RestController
@RequestMapping("/workinghours")
@CrossOrigin(origins = "http://localhost:4200/")
public class WorkingHoursController {

    @PostMapping("/checkTutorWorkingHours")
    public WorkingHours checkTutorWorkingHours(@RequestBody Class c) {
        return new WorkingHoursRepo().checkTutorWorkingHours(c);
    }

    @PostMapping("/checkTutorTimeoff")
    public WorkingHours checkTutorTimeoff(@RequestBody Class c) {
        return new WorkingHoursRepo().checkTutorTimeoff(c);
    }

    @PostMapping("/add")
    public int add(@RequestBody WorkingHours w) {
        return new WorkingHoursRepo().add(w);
    }
    
}
