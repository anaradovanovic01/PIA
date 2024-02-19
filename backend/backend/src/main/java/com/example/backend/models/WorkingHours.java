package com.example.backend.models;

import java.time.LocalDateTime;

public class WorkingHours {
    private int id;
    private String tutor;
    private LocalDateTime start;
    private LocalDateTime end;
    private boolean working;
    
    public WorkingHours(int id, String tutor, LocalDateTime start, LocalDateTime end, boolean working) {
        this.id = id;
        this.tutor = tutor;
        this.start = start;
        this.end = end;
        this.working = working;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getTutor() {
        return tutor;
    }
    public void setTutor(String tutor) {
        this.tutor = tutor;
    }
    public LocalDateTime getStart() {
        return start;
    }
    public void setStart(LocalDateTime start) {
        this.start = start;
    }
    public LocalDateTime getEnd() {
        return end;
    }
    public void setEnd(LocalDateTime end) {
        this.end = end;
    }
    public boolean isWorking() {
        return working;
    }
    public void setWorking(boolean working) {
        this.working = working;
    }


}