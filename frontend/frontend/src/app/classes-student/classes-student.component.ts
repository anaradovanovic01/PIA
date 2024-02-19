import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { ClassService } from '../services/class.service';
import { Class } from '../models/Class';

@Component({
  selector: 'app-classes-student',
  templateUrl: './classes-student.component.html',
  styleUrls: ['./classes-student.component.css']
})
export class ClassesStudentComponent implements OnInit {

  constructor(private router:Router, private classService: ClassService) {}

  user: User = new User();
  loggedIn: boolean = false;
  pastClasses: Class[] = [];
  upcomingClasses: Class[] = []; 

  ngOnInit(): void {
    let item = localStorage.getItem('loggedIn');
    if(item) this.user = JSON.parse(item);
    if(this.user.username == "") this.loggedIn = false;
    else this.loggedIn = true;
    if(this.user.type != 'student') {
      alert("Only students can access this page");
      this.router.navigate(['profile']);
      return;
    }
    this.classService.getAllPastClassesForStudent(this.user.username).subscribe(resp=>{
      if(!resp) alert("Error");
      else this.pastClasses = resp;
    });
    this.classService.getAllUpcomingClassesForStudent(this.user.username).subscribe(resp=>{
      if(!resp) alert("Error");
      else this.upcomingClasses = resp;
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

  leaveReview(c:Class) {
    let review = prompt("How would you rate this class from 1 to 5?");
    if(review!=null && (Number.isNaN(Number(review)) || Number(review)<1 || Number(review)>5)) {
      alert("Error! Number must be from 1 to 5! Try again!");
      return;
    }
    let comment = prompt("Please leave a comment:");
    if(review!=null && comment!=null) this.classService.leaveReviewForTutor(c.id, Number(review), comment).subscribe(resp=>{
      if(!resp && resp==0) alert("Error");
      else {
        alert("You successfully left a review!");
        this.ngOnInit();
      }
    })
  }

}
