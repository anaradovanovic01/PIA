import { Component } from '@angular/core';
import { User } from '../models/User';
import { TeachesService } from '../services/teaches.service';
import { ClassService } from '../services/class.service';
import { Class } from '../models/Class';
import { Subject } from '../models/Subject';
import { WorkingHoursService } from '../services/working-hours.service';

@Component({
  selector: 'app-view-tutor-profile',
  templateUrl: './view-tutor-profile.component.html',
  styleUrls: ['./view-tutor-profile.component.css']
})
export class ViewTutorProfileComponent {

  constructor(private teachesService:TeachesService, private classesService:ClassService, private workingHoursService: WorkingHoursService) {}

  ngOnInit(): void {
    let item = localStorage.getItem('loggedIn');
    if(item) this.user = JSON.parse(item);
    if(this.user.username == "") this.loggedIn = false;
    else {
      this.loggedIn = true;
      item = localStorage.getItem("tutor");
      if(item) this.tutor = JSON.parse(item);
      this.teachesService.getAllSubjectsForTutor(this.tutor.username).subscribe(subjects=>{
        this.tutor.subjects=subjects;
        this.chosenSubject = subjects[0];
      });
      this.classesService.getAllClassesForTutor(this.tutor.username).subscribe(classes=>this.classes=classes);
      this.classesService.getRatingForTutor(this.tutor.username).subscribe(rating=>this.rating=rating);
      let apiUrl = `http://localhost:8080/files/${this.tutor.image}`;
      this.imageUrl = apiUrl;
    }
  }

  user: User = new User();
  tutor: User = new User();
  classes: Class[] = [];
  rating: number = 0;
  loggedIn: boolean = false;
  imageUrl: string = "";
  chosenSubject: Subject = new Subject();
  datetime: string = "";
  desc: string = "";
  doubletime: boolean = false;
  message: string = "";

  schedule() {
    if(this.chosenSubject.name === "" || this.desc === "" || this.datetime === "") {
      this.message = "You have to fill all fields before continuing.";
      return;
    }
    let date = new Date(this.datetime);
    let today = new Date();
    if(date < today) {
      this.message = "You cannot schedule a class in the past!"
      return;
    }
    this.classesService.checkTutorAvailability(this.tutor.username, date, this.doubletime).subscribe(resp => {
      if(resp == false) {
        this.message = "This tutor already has a class scheduled at this time."
        return;
      } else {
        this.workingHoursService.checkTutorTimeoff(this.tutor.username, date, this.doubletime).subscribe(resp => {
          if(resp != null) {
            let start: string[] = resp.start.toString().split("T");
            let end: string[] = resp.end.toString().split("T");
            this.message = "This tutor is not working from " + start[0] + " at " + start[1] + " to " + end[0] + " at " + end[1] + ".";
            return;
          }
          this.workingHoursService.checkTutorWorkingHours(this.tutor.username, date, this.doubletime).subscribe(resp => {
            if(resp == null) {
              if(date.getDay() == 0 || date.getDay() == 6 || (date.getDay() > 0 && date.getDay() < 6 && (date.getHours() < 10 || date.getHours() >= 18))) {
                this.message = "This tutor's working hours are weekdays from 10:00 AM to 6:00 PM."
                return;
              }
            }
            this.classesService.addClass(this.user.username, this.tutor.username, this.chosenSubject.name, this.desc, date, this.doubletime).subscribe(resp => {
              if(!resp) this.message = "Error";
              else {
                this.message = "";
                alert("You have successfully scheduled a class!");
                this.ngOnInit();
              }
            })
          })
        })
      }
    })
  }

}
