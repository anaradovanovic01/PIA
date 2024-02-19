package com.example.backend.db;

import java.util.List;

import com.example.backend.models.Notification;

public interface NotificationRepoInterface {

    public List<Notification> getAllSeenForStudent(String s);

    public List<Notification> getAllNewForStudent(String s);

    public int add(Notification n);

    public int seen(int id);
    
}
