package com.example.backend.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.RegRequestRepo;
import com.example.backend.models.RegRequest;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/requests")
@CrossOrigin(origins = "http://localhost:4200/")
public class RegRequestController {
    
    @PostMapping("/addRequest")
    public int addTutor(@RequestBody RegRequest r) {
        return new RegRequestRepo().addRequest(r);
    }

    @PostMapping("/getRequest")
    public RegRequest getRequest(@RequestBody String username) {
        return new RegRequestRepo().getRequest(username);
    }

    @PostMapping("/updateAge")
    public int updateRequest(@RequestBody RegRequest r) {
        return new RegRequestRepo().updateAge(r);
    }

    @PostMapping("/approve")
    public int approve(@RequestBody String username) {
        return new RegRequestRepo().approve(username);
    }

    @PostMapping("/deny")
    public int deny(@RequestBody String username) {
        return new RegRequestRepo().deny(username);
    }

    @GetMapping("getAgeCount")
    public int[] getAgeCount() {
        return new RegRequestRepo().getAgeCount();
    }
    

}
