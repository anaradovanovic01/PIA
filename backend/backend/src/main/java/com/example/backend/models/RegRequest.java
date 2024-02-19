package com.example.backend.models;

public class RegRequest {
    private String username;
    private String cv;
    private String subjects;
    private String age;
    private String whereDidYouHearAboutUs;
    private short approved;

    public RegRequest(String username, String cv, String subjects, String age, String whereDidYouHearAboutUs, short approved) {
        this.username = username;
        this.cv = cv;
        this.subjects = subjects;
        this.age = age;
        this.whereDidYouHearAboutUs = whereDidYouHearAboutUs;
        this.approved = approved;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCv() {
        return cv;
    }

    public void setCv(String cv) {
        this.cv = cv;
    }

    public String getSubjects() {
        return subjects;
    }

    public void setSubjects(String subject) {
        this.subjects = subject;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getWhereDidYouHearAboutUs() {
        return whereDidYouHearAboutUs;
    }

    public void setWhereDidYouHearAboutUs(String whereDidYouHearAboutUs) {
        this.whereDidYouHearAboutUs = whereDidYouHearAboutUs;
    }

    public short getApproved() {
        return approved;
    }

    public void setApproved(short approved) {
        this.approved = approved;
    }
}
