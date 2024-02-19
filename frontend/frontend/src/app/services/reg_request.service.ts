import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegRequest } from '../models/RegRequest';

@Injectable({
  providedIn: 'root'
})
export class RegRequestService {

  constructor(private http:HttpClient) { }

  uri = 'http://localhost:8080/requests';

  register(username: string, cv: string, subjects: string, age: string, where: string) {
     const data = {
      username : username,
      cv: cv,
      subjects : subjects,
      age : age,
      whereDidYouHearAboutUs : where
    }
    return this.http.post<number>(`${this.uri}/addRequest`, data);
  }

  getRequest(username: string) {
    return this.http.post<RegRequest>(`${this.uri}/getRequest`, username);
  }

  updateAge(username:string, age: string) {
    const data = {
     username: username,
     age : age
   }
   return this.http.post<number>(`${this.uri}/updateAge`, data);
  }

  approve(username: string) {
    return this.http.post<number>(`${this.uri}/approve`, username);
  }

  deny(username: string) {
    return this.http.post<number>(`${this.uri}/deny`, username);
  }

  getAgeCount() {
    return this.http.get<number[]>(`${this.uri}/getAgeCount`);
  }

}