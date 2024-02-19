package com.example.backend.models;

public class User {
    private String username;
    private String password;
    private String question;
    private String answer;
    private String type;
    private String firstname;
    private String lastname;
    private String gender;
    private String address;
    private String contact;
    private String email;
    private String image;
    private String typeOfSchool;
    private int currentGrade;
    private RegRequest request;
    private boolean deleted;
    
    public User(String username, String password, String question, String answer, String type, String firstname, String lastname, 
            String gender, String address, String contact, String email, String image, String typeOfSchool, int currentGrade, 
            boolean deleted,  RegRequest request) {
        this.username = username;
        this.password = password;
        this.question = question;
        this.answer = answer;
        this.type = type;
        this.firstname = firstname;
        this.lastname = lastname;
        this.gender = gender;
        this.address = address;
        this.contact = contact;
        this.email = email;
        this.image = image;
        this.typeOfSchool = typeOfSchool;
        this.currentGrade = currentGrade;
        this.request = request;
        this.deleted = deleted;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getTypeOfSchool() {
        return typeOfSchool;
    }

    public void setTypeOfSchool(String typeOfSchool) {
        this.typeOfSchool = typeOfSchool;
    }

    public int getCurrentGrade() {
        return currentGrade;
    }

    public void setCurrentGrade(int currentGrade) {
        this.currentGrade = currentGrade;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public RegRequest getRequest() {
        return request;
    }

    public void setRequest(RegRequest request) {
        this.request = request;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
    

}
