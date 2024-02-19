import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClassService } from '../services/class.service';
import { User } from '../models/User';
import { Class } from '../models/Class';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';
import { Notification } from '../models/Notification';
import { Time } from '@angular/common';
import { WorkingHoursService } from '../services/working-hours.service';

@Component({
  selector: 'app-classes-tutor',
  templateUrl: './classes-tutor.component.html',
  styleUrls: ['./classes-tutor.component.css']
})
export class ClassesTutorComponent {

  constructor(private router:Router, private classService: ClassService, private userService: UserService, 
    private notificationService:NotificationService, private workingHoursService:WorkingHoursService) {}

  user: User = new User();
  loggedIn: boolean = false;
  upcomingClasses: Class[] = []; 
  fiveClasses: Class[] = []; 
  tenClasses: Class[] = []; 
  allClasses: Class[] = []; 
  show: number = 5;
  classesRequests: Class[] = [];
  students: String[] = [];
  ratings: String[] = [];
  start: string = "";
  time: number = 0;
  period: string = "";
  message: string = "";
  working: boolean = true;
  
  ngOnInit(): void {
    let item = localStorage.getItem('loggedIn');
    if(item) this.user = JSON.parse(item);
    if(this.user.username == "") this.loggedIn = false;
    else this.loggedIn = true;
    if(this.user.type != 'tutor') {
      alert("Only tutors can access this page");
      this.router.navigate(['profile']);
      return;
    }
    this.classService.getNext5ClassesForTutorIn3Days(this.user.username).subscribe(resp=>{
      if(!resp) alert("Error");
      else {
        this.upcomingClasses = resp;
        this.fiveClasses = resp;
      }
    });
    this.classService.getNext10ClassesForTutorIn3Days(this.user.username).subscribe(resp=>{
      if(!resp) alert("Error");
      else this.tenClasses = resp;
    });
    this.classService.getAllClassesForTutorIn3Days(this.user.username).subscribe(resp=>{
      if(!resp) alert("Error");
      else this.allClasses = resp;
    });
    this.classService.getAllClassRequestsForTutor(this.user.username).subscribe(resp=>{
      if(!resp) alert("Error");
      else {
        this.classesRequests=resp;
        this.students = [];
        this.ratings = []; 
        this.classesRequests.forEach(req=>{
          this.userService.getUser(req.student).subscribe(resp=>{
            if(!resp) alert("Error");
            else this.students.push(resp.firstname + " " + resp.lastname);
          });
          this.classService.getRatingForStudent(req.student).subscribe(resp=>{
            if(resp==null || resp==undefined) alert("Error");
            else if(resp == 0) this.ratings.push("no reviews");
            else this.ratings.push(resp.toString());
          })
        })
      }
    });
  }

  calculateEndTime(datetime: Date, doubletime: boolean) {
    let end: Date = new Date(datetime.valueOf());
    if(doubletime) end.setHours(end.getHours()+2);
    else end.setHours(end.getHours()+1);
    return end;
  }

  checkIf15Before(datetime: Date) {
    if(Math.abs(Date.parse(datetime.toString()) - Date.parse(new Date().toString())) < 900000) return true;
    else return false;
  }

  checkIf4Before(datetime: Date) {
    if(Math.abs(Date.parse(datetime.toString()) - Date.parse(new Date().toString())) < 14400000) return true;
    else return false;
  }

  show5() {
    this.show = 5;
    this.upcomingClasses = this.fiveClasses;
  }

  show10() {
    this.show = 10;
    this.upcomingClasses = this.tenClasses;
  }

  showAll() {
    this.show = 0;
    this.upcomingClasses = this.allClasses;
  }

  accept(c:Class) {
    this.classService.acceptClassRequest(c.id).subscribe(resp=>{
      if(!resp) alert("Error");
      else {
        let dateStr: string[] = c.datetime.toString().split("T");
        let str = "Your class request in " + c.subject + " on the " + dateStr[0] + " at " + dateStr[1] + " as been accepted by " + c.tutor + ".";
        this.notificationService.add(c.id, c.student, str, "accept").subscribe(resp=>{
          if(resp<=0) alert("Error");
          else this.ngOnInit();
        });
      }
    })
  }

  decline(c:Class) {
    let explanation = prompt('Give an explanation for declining the class:');
    if(explanation!=null) {
      if(explanation === "") {
        alert("You have to give an explanation for declining this class request!");
        return;
      }
      this.classService.declineClassRequest(c.id, explanation).subscribe(resp=>{
        if(!resp) alert("Error");
        else {
          let dateStr: string[] = c.datetime.toString().split("T");
          let str = "Your class request in " + c.subject + " on the " + dateStr[0] + " at " + dateStr[1] + " as been declined by " + c.tutor + " because '" + explanation + "'.";
          this.notificationService.add(c.id, c.student, str, "deny").subscribe(resp=>{
            if(resp<=0) alert("Error");
            else this.ngOnInit();
          });
        }
      })
    }
  }

  cancel(c:Class) {
    let explanation = prompt('Give an explanation for canceling the class:');
    if(explanation!=null) {
      if(explanation === "") {
        alert("You have to give an explanation for canceling this class!");
        return;
      }
      this.classService.declineClassRequest(c.id, explanation).subscribe(resp=>{
        if(!resp) alert("Error");
        else {
          let dateStr: string[] = c.datetime.toString().split("T");
          let str = "Your class in " + c.subject + " on the " + dateStr[0] + " at " + dateStr[1] + " as been canceled by " + c.tutor + " because '" + explanation + "'.";
          this.notificationService.add(c.id, c.student, str, "cancel").subscribe(resp=>{
            if(resp<=0) alert("Error");
            else this.ngOnInit();
          });
        }
      })
    }
  }

  schedule() {
    if(this.start === "" || this.time == 0 || this.period === "") {
      this.message = "You have to fill out all fields before continuing";
      return;
    }
    let startDate = new Date(this.start);
    let today = new Date();
    if(startDate < today) {
      this.message = "You cannot schedule time off in the past!"
      return;
    }
    let endTimestamp = startDate.getTime();
    if(this.period === 'm') endTimestamp += this.time * 60000;
    if(this.period === 'h') endTimestamp += this.time * 3600000;
    if(this.period === 'd') endTimestamp += this.time * 86400000;
    let end = new Date(endTimestamp);
    this.workingHoursService.add(this.user.username, startDate, end, this.working).subscribe(resp=>{
      if(!resp) alert("Error!");
      else 
        if(this.working) alert("You successfully scheduled you working hours")
        else alert("You successfully scheduled you time off")
    })
  }

}
