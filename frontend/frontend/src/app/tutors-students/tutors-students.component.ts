import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/User';

@Component({
  selector: 'app-tutors-students',
  templateUrl: './tutors-students.component.html',
  styleUrls: ['./tutors-students.component.css']
})
export class TutorsStudentsComponent {

  constructor(private router: Router, private userService:UserService) {}

  user: User = new User();
  loggedIn: boolean = false;
  students: User[] = [];

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
    this.userService.getStudentsForTutor(this.user.username).subscribe(resp=>{
      if(!resp) alert("Error");
      else this.students = resp;
    })
  }

  viewStudent(s: User) {
    localStorage.setItem("student", JSON.stringify(s));
    this.router.navigate(['view-student']);
  }

}
