import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../models/Subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http:HttpClient) { }

  uri = 'http://localhost:8080/subjects';

  getAll() {
    return this.http.get<Subject[]>(`${this.uri}/getAll`);
  }

  add(subject: String) {
    return this.http.post<number>(`${this.uri}/add`, subject);
  }

}
