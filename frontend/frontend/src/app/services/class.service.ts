import { Injectable } from '@angular/core';
import { Class } from '../models/Class';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http:HttpClient) { }

  uri = 'http://localhost:8080/classes';

  getClassesCountLastMonth() {
    return this.http.get<number>(`${this.uri}/getClassesCountLastMonth`);
  }

  getClassesCountLastWeek() {
    return this.http.get<number>(`${this.uri}/getClassesCountLastWeek`);
  }

  getRatingForTutor(username: string) {
    return this.http.post<number>(`${this.uri}/getRatingForTutor`, username);
  }

  getAllClassesForTutor(username: string) {
    return this.http.post<Class[]>(`${this.uri}/getAllClassesForTutor`, username);
  }

  addClass(student: string, tutor: string, subject:string, desc:string, datetime: Date, doubletime:boolean) {
    const data = {
      student: student,
      tutor: tutor,
      subject:subject,
      description: desc,
      datetime: datetime,
      doubletime: doubletime
    }
    return this.http.post<number>(`${this.uri}/addClass`, data);
  }

  checkTutorAvailability(tutor: string, datetime: Date, doubletime: boolean) {
    const data = {
      tutor : tutor,
      datetime : datetime,
      doubletime: doubletime
    }
    return this.http.post<boolean>(`${this.uri}/checkTutorAvailability`, data);
  }

  getAllPastClassesForStudent(student: string) {
    return this.http.post<Class[]>(`${this.uri}/getAllPastClassesForStudent`, student);
  }

  getAllUpcomingClassesForStudent(student: string) {
    return this.http.post<Class[]>(`${this.uri}/getAllUpcomingClassesForStudent`, student);
  }

  getNext5ClassesForTutorIn3Days(tutor: string) {
    return this.http.post<Class[]>(`${this.uri}/getNext5ClassesForTutorIn3Days`, tutor);
  }

  getNext10ClassesForTutorIn3Days(tutor: string) {
    return this.http.post<Class[]>(`${this.uri}/getNext10ClassesForTutorIn3Days`, tutor);
  }

  getAllClassesForTutorIn3Days(tutor: string) {
    return this.http.post<Class[]>(`${this.uri}/getAllClassesForTutorIn3Days`, tutor);
  }

  getAllClassRequestsForTutor(tutor: string) {
    return this.http.post<Class[]>(`${this.uri}/getAllClassRequestsForTutor`, tutor);
  }

  getRatingForStudent(username: string) {
    return this.http.post<number>(`${this.uri}/getRatingForStudent`, username);
  }

  acceptClassRequest(id: number) {
    return this.http.post<number>(`${this.uri}/acceptClassRequest`, id);
  }

  declineClassRequest(id: number, explanation: string) {
    const data = {
      id: id, 
      explanation: explanation
    }
    return this.http.post<number>(`${this.uri}/declineClassRequest`, data);
  }

  getClassesForStudentAndTutor(student: string, tutor:string) {
    let str: string[] = [];
    str.push(student);
    str.push(tutor);
    return this.http.post<Class[]>(`${this.uri}/getClassesForStudentAndTutor`, str);
  }

  leaveReviewForStudent(id: number, review:number, comment:string) {
    let c: Class = new Class();
    c.id = id;
    c.reviewForStudent = review;
    c.commentForStudent = comment;
    return this.http.post<number>(`${this.uri}/leaveReviewForStudent`, c);
  }

  leaveReviewForTutor(id: number, review:number, comment:string) {
    let c: Class = new Class();
    c.id = id;
    c.reviewForTutor = review;
    c.commentForTutor = comment;
    return this.http.post<number>(`${this.uri}/leaveReviewForTutor`, c);
  }

  getWeekDayCount() {
    return this.http.get<number[]>(`${this.uri}/getWeekDayCount`);
  }

  getClassCountForTutor() {
    return this.http.get<string[]>(`${this.uri}/getClassCountForTutor`);
  }

  getMonthCountForTutor(t:string) {
    return this.http.post<number[]>(`${this.uri}/getMonthCountForTutor`, t);
  }

  getDoubleTimeCount() {
    return this.http.get<number[]>(`${this.uri}/getDoubleTimeCount`);
  }

  getReviewStatistics() {
    return this.http.get<number[]>(`${this.uri}/getReviewStatistics`);
  }
}
