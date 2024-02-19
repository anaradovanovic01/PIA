package com.example.backend.models;

import java.time.LocalDateTime;

public class Class {
    private int id;
    private String student;
    private String tutor;
    private String subject;
    private String description;
    private LocalDateTime datetime;
    private Boolean doubletime;
    private short approved;
    private String explanation;
    private int reviewForTutor;
    private String commentForTutor;
    private int reviewForStudent;
    private String commentForStudent;

    public Class(int id, String student, String tutor, String subject, String description, LocalDateTime datetime,
            Boolean doubletime, short approved, String explanation, int reviewForTutor, String commentForTutor,
            int reviewForStudent, String commentForStudent) {
        this.id = id;
        this.student = student;
        this.tutor = tutor;
        this.subject = subject;
        this.description = description;
        this.datetime = datetime;
        this.doubletime = doubletime;
        this.approved = approved;
        this.explanation = explanation;
        this.reviewForTutor = reviewForTutor;
        this.commentForTutor = commentForTutor;
        this.reviewForStudent = reviewForStudent;
        this.commentForStudent = commentForStudent;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStudent() {
        return student;
    }

    public void setStudent(String student) {
        this.student = student;
    }

    public String getTutor() {
        return tutor;
    }

    public void setTutor(String tutor) {
        this.tutor = tutor;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getDatetime() {
        return datetime;
    }

    public void setDatetime(LocalDateTime datetime) {
        this.datetime = datetime;
    }

    public Boolean getDoubletime() {
        return doubletime;
    }

    public void setDoubletime(Boolean doubletime) {
        this.doubletime = doubletime;
    }

    public short getApproved() {
        return approved;
    }

    public void setApproved(short approved) {
        this.approved = approved;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public int getReviewForTutor() {
        return reviewForTutor;
    }

    public void setReviewForTutor(int reviewForTutor) {
        this.reviewForTutor = reviewForTutor;
    }

    public String getCommentForTutor() {
        return commentForTutor;
    }

    public void setCommentForTutor(String commentForTutor) {
        this.commentForTutor = commentForTutor;
    }

    public int getReviewForStudent() {
        return reviewForStudent;
    }

    public void setReviewForStudent(int reviewForStudent) {
        this.reviewForStudent = reviewForStudent;
    }

    public String getCommentForStudent() {
        return commentForStudent;
    }

    public void setCommentForStudent(String commentForStudent) {
        this.commentForStudent = commentForStudent;
    }
    
    
    

}
