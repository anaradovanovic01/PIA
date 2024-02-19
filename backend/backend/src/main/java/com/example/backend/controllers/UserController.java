package com.example.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.UserRepo;
import com.example.backend.models.User;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200/")
public class UserController {

    private Argon2 argon2;

    public UserController() {
        this.argon2 = Argon2Factory.create();
    }
    
    @PostMapping("/login")
    public User login(@RequestBody User u) {
        User user = new UserRepo().getUser(u.getUsername());
        if(argon2.verify(user.getPassword(), u.getPassword().toCharArray()))
            return user;
        else return null; 
    }

    @PostMapping("/getUser")
    public User getUser(@RequestBody String username) {
        return new UserRepo().getUser(username);
    }

    @PostMapping("/getUserByEmail")
    public User getUserByEmail(@RequestBody String email) {
        return new UserRepo().getUserByEmail(email);
    }

    @PostMapping("/addUser")
    public int addUser(@RequestBody User u) {
        String pass = argon2.hash(10, 65536, 1, u.getPassword().toCharArray());
        u.setPassword(pass);
        return new UserRepo().addUser(u);
    }

    @PostMapping("/changePassword")
    public int changePassword(@RequestBody User u) {
        String pass = argon2.hash(10, 65536, 1, u.getPassword().toCharArray());
        u.setPassword(pass);
        return new UserRepo().changePassword(u);
    }

    @PostMapping("/checkSecurityQuestion")
    public boolean checkSecurityQuestion(@RequestBody User u) {
        return new UserRepo().checkSecurityQuestion(u);
    }

    @PostMapping("/updateUser")
    public int updateUser(@RequestBody User u) {
        return new UserRepo().updateUser(u);
    }

    @PostMapping("/updateImage")
    public int updateImage(@RequestBody User u) {
        return new UserRepo().updateImage(u);
    }

    @GetMapping("/getStudentCount")
    public int getStudents() {
        return new UserRepo().getStudentCount();
    }
    
    @GetMapping("/getApprovedTutors")
    public List<User> getApprovedTutors() {
        return new UserRepo().getApprovedTutors();
    }

    @GetMapping("/getNonApprovedTutors")
    public List<User> getNonApprovedTutors() {
        return new UserRepo().getNonApprovedTutors();
    }

    @GetMapping("/getAllStudents")
    public List<User> getAllStudents() {
        return new UserRepo().getAllStudents();
    }

    @PostMapping("/getStudentsForTutor")
    public List<User> getStudentsForTutor(@RequestBody String tutor) {
        return new UserRepo().getStudentsForTutor(tutor);
    }

    @PostMapping("/removeTutor")
    public int removeTutor(@RequestBody String tutor) {
        return new UserRepo().removeTutor(tutor);
    }

    @GetMapping("/getGenderCount")
    public int[] getGenderCount() {
        return new UserRepo().getGenderCount();
    }

}
