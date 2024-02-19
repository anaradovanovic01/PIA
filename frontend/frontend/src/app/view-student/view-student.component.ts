import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { ClassService } from '../services/class.service';
import { Class } from '../models/Class';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent {

  constructor(private router: Router, private classService: ClassService) {}

  user: User = new User();
  loggedIn: boolean = false;
  student: User = new User();
  classes: Class[] = [];

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
    item = localStorage.getItem("student");
    if(item) this.student = JSON.parse(item);
    this.classService.getClassesForStudentAndTutor(this.student.username, this.user.username).subscribe(resp=>{
      if(!resp) alert("Error");
      else this.classes = resp;
    })
  }

  leaveReview(c:Class) {
    let review = prompt("How would you rate this class from 1 to 5?");
    if(review!=null && (Number.isNaN(Number(review)) || Number(review)<1 || Number(review)>5)) {
      alert("Error! Number must be from 1 to 5! Try again!");
      return;
    }
    let comment = prompt("Please leave a comment:");
    if(review!=null && comment!=null) this.classService.leaveReviewForStudent(c.id, Number(review), comment).subscribe(resp=>{
      if(!resp && resp==0) alert("Error");
      else {
        alert("You successfully left a review!");
        this.ngOnInit();
      }
    })
  }
}
