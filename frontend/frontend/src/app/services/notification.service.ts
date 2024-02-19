import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notification } from '../models/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient) { }

  uri = 'http://localhost:8080/notifications';

  getAllSeenForStudent(s: string) {
    return this.http.post<Notification[]>(`${this.uri}/getAllSeenForStudent`, s);
  }

  getAllNewForStudent(s: string) {
    return this.http.post<Notification[]>(`${this.uri}/getAllNewForStudent`, s);
  }

  add(classId: number, student: string, text:string, type:string) {
    const data = {
      classId: classId,
      student: student,
      text: text,
      type: type
    }
    return this.http.post<number>(`${this.uri}/add`, data);
  }

  seen(id:number) {
    return this.http.post<number>(`${this.uri}/seen`, id);
  }

}
