package com.example.backend.models;

public class Teaches {
    private String subject;
    private String tutor;

    public Teaches(String subject, String tutor) {
        this.subject = subject;
        this.tutor = tutor;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getTutor() {
        return tutor;
    }

    public void setTutor(String tutor) {
        this.tutor = tutor;
    }

}
