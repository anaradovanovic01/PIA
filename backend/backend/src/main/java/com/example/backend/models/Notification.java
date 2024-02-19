package com.example.backend.models;

import java.time.LocalDateTime;

public class Notification {
    private int id;
    private int classId;
    private String student;
    private String type;
    private LocalDateTime datetime;
    private Boolean seen;
    private Class c;
    
    public Notification(int id, int classId, String student, String type, LocalDateTime datetime, Boolean seen) {
        this.id = id;
        this.classId = classId;
        this.student = student;
        this.type = type;
        this.datetime = datetime;
        this.seen = seen;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public int getClassId() {
        return classId;
    }
    public void setClassId(int classId) {
        this.classId = classId;
    }
    public String getStudent() {
        return student;
    }
    public void setStudent(String student) {
        this.student = student;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public LocalDateTime getDatetime() {
        return datetime;
    }
    public void setDatetime(LocalDateTime datetime) {
        this.datetime = datetime;
    }
    public Boolean getSeen() {
        return seen;
    }
    public void setSeen(Boolean seen) {
        this.seen = seen;
    }
    public Class getC() {
        return c;
    }
    public void setClass(Class c) {
        this.c = c;
    }
    
}
