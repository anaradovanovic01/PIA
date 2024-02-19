import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  uri = 'http://localhost:8080/users';

  login(username: string, password: string) {
    const data = {
      username : username,
      password : password
    }
    return this.http.post<User>(`${this.uri}/login`, data);
  }

  getUser(username: string) {
    return this.http.post<User>(`${this.uri}/getUser`, username);
  }

  getUserByEmail(email: string) {
    return this.http.post<User>(`${this.uri}/getUserByEmail`, email);
  }

  register(username: string, password: string, question: string, answer: string, type: string, firstname: string, lastname: string, 
    gender: string, address: string, contact: string, email: string, image: string, typeOfSchool: string, currentGrade: number) {
      const data = {
        username: username,
        password: password,
        question: question,
        answer: answer,
        type: type,
        firstname: firstname,
        lastname: lastname,
        gender: gender,
        address: address,
        contact: contact,
        email: email,
        image: image,
        typeOfSchool: typeOfSchool,
        currentGrade: currentGrade,
      }
      return this.http.post<number>(`${this.uri}/addUser`, data);
  }

  changePassword(username: string, password: string) {
    const data = {
      username : username,
      password : password
    }
    return this.http.post<number>(`${this.uri}/changePassword`, data);
  }

  checkSecurityQuestion(username: string, answer: string) {
    const data = {
      username : username,
      answer : answer
    }
    return this.http.post<boolean>(`${this.uri}/checkSecurityQuestion`, data);
  }

  update(username: string, type: string, firstname: string, lastname: string, address: string, contact: string, email: string, typeOfSchool: string, currentGrade: number) {
      const data = {
        username: username,
        type: type,
        firstname: firstname,
        lastname: lastname,
        address: address,
        contact: contact,
        email: email,
        typeOfSchool: typeOfSchool,
        currentGrade: currentGrade,
      }
      return this.http.post<number>(`${this.uri}/updateUser`, data);
  }

  updateImage(username: string, image: string) {
    const data = {
      username : username,
      image : image
    }
    return this.http.post<number>(`${this.uri}/updateImage`, data);
  }

  getStudentCount() {
    return this.http.get<number>(`${this.uri}/getStudentCount`);
  }

  getApprovedTutors() {
    return this.http.get<User[]>(`${this.uri}/getApprovedTutors`);
  }

  getStudentsForTutor(tutor: string) {
    return this.http.post<User[]>(`${this.uri}/getStudentsForTutor`, tutor);
  }

  getAllStudents() {
    return this.http.get<User[]>(`${this.uri}/getAllStudents`);
  }

  getNonApprovedTutors() {
    return this.http.get<User[]>(`${this.uri}/getNonApprovedTutors`);
  }

  removeTutor(username: string) {
    return this.http.post<number>(`${this.uri}/removeTutor`, username);
  }

  getGenderCount() {
    return this.http.get<number[]>(`${this.uri}/getGenderCount`);
  }

}
