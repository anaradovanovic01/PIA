import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../models/Subject';

@Injectable({
  providedIn: 'root'
})
export class TeachesService {

  constructor(private http:HttpClient) { }

  uri = 'http://localhost:8080/teaches';

  getSubjects() {
    return this.http.get<string[]>(`${this.uri}/getSubjects`);
  }

  getAllTutorForSubject(subject: string) {
    return this.http.post<string[]>(`${this.uri}/getAllTutorForSubject`, subject);
  }
  
  getAllSubjectsForTutor(username: string) {
    return this.http.post<Subject[]>(`${this.uri}/getAllSubjectsForTutor`, username);
  }

  add(tutor:string, subject:string) {
    let data: string[] = [tutor, subject];
    return this.http.post<number>(`${this.uri}/add`, data);
  }

  remove(tutor:string, subject:string) {
    let data: string[] = [tutor, subject];
    return this.http.post<number>(`${this.uri}/remove`, data);
  }
  
  getCountForSubjects() {
    return this.http.get<number[]>(`${this.uri}/getCountForSubjects`);
  }

}
