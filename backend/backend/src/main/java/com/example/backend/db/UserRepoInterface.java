package com.example.backend.db;

import java.util.List;

import com.example.backend.models.User;

public interface UserRepoInterface {
    
    public User login(User u);

    public User getUser(String username);

    public User getUserByEmail(String email);

    public int addUser(User u);

    public int changePassword(User u);

    public boolean checkSecurityQuestion(User u);

    public int updateUser(User u);

    public int updateImage(User u);

    public int getStudentCount();

    public List<User> getApprovedTutors();

    public List<User> getNonApprovedTutors();

    public List<User> getAllStudents();

    public List<User> getStudentsForTutor(String tutor);

    public int removeTutor(String username);

    public int[] getGenderCount();

}
