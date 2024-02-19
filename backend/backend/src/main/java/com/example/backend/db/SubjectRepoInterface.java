package com.example.backend.db;

import java.util.List;

import com.example.backend.models.Subject;

public interface SubjectRepoInterface {

    public List<Subject> getAll();

    public int add(String subject);

}
