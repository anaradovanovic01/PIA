package com.example.backend.db;

import java.util.List;

import com.example.backend.models.Subject;

public interface TeachesRepoInterface {
    
    public List<String> getSubjects();

    public List<String> getAllTutorForSubject(String subject);

    public List<Subject> getAllSubjectsForTutor(String username);

    public int add(String tutor, String subject);

    public int remove(String tutor, String subject);

    public List<Integer> getCountForSubjects();

}
