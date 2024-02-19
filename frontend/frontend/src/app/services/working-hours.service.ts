import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkingHours } from '../models/WorkingHours';

@Injectable({
  providedIn: 'root'
})
export class WorkingHoursService {

  constructor(private http:HttpClient) { }

  uri = 'http://localhost:8080/workinghours';

  checkTutorTimeoff(tutor: string, datetime: Date, doubletime: boolean) {
    const data = {
      tutor : tutor,
      datetime : datetime,
      doubletime: doubletime
    }
    return this.http.post<WorkingHours>(`${this.uri}/checkTutorTimeoff`, data);
  }

  checkTutorWorkingHours(tutor: string, datetime: Date, doubletime: boolean) {
    const data = {
      tutor : tutor,
      datetime : datetime,
      doubletime: doubletime
    }
    return this.http.post<WorkingHours>(`${this.uri}/checkTutorWorkingHours`, data);
  }

  add(tutor: string, start: Date, end:Date, working: boolean) {
    const data = {
      tutor: tutor,
      start: start,
      end: end,
      working: working
    }
    return this.http.post<number>(`${this.uri}/add`, data);
  }
}
