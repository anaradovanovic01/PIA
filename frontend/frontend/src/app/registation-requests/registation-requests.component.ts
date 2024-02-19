import { Component } from '@angular/core';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { SubjectService } from '../services/subject.service';
import { RegRequest } from '../models/RegRequest';
import { UserService } from '../services/user.service';
import { RegRequestService } from '../services/reg_request.service';
import { TeachesService } from '../services/teaches.service';
import { Subject } from '../models/Subject';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-registation-requests',
  templateUrl: './registation-requests.component.html',
  styleUrls: ['./registation-requests.component.css']
})
export class RegistationRequestsComponent {

  constructor(private router:Router, private userService:UserService, private subjectService:SubjectService, 
    private regRequestService:RegRequestService, private teachesService:TeachesService, private fileService:FileService) {}

  user: User = new User();
  loggedIn: boolean = false;
  subjectName: string = "";
  students: User[] = [];
  approvedTutors: User[] = [];
  nonApprovedTutors: User[] = [];
  requests: RegRequest[] = [];
  allSubjects: Subject[] = [];

  ngOnInit(): void {
    let item = localStorage.getItem('loggedIn');
    if(item) this.user = JSON.parse(item);
    if(this.user.username == "") this.loggedIn = false;
    else this.loggedIn = true;
    if(this.user.type != 'admin') {
      alert("Only admins can access this page");
      this.router.navigate(['']);
      return;
    }
    this.userService.getAllStudents().subscribe(resp=>{
      if(!resp) alert("Error");
      else this.students = resp;
    })
    this.userService.getApprovedTutors().subscribe(resp=>{
      if(!resp) alert("Error");
      else {
        this.approvedTutors = resp;
        this.approvedTutors.forEach(t=>{
          this.teachesService.getAllSubjectsForTutor(t.username).subscribe(resp=>{
            t.subjects = resp;
          })
        })
      }
    })
    this.userService.getNonApprovedTutors().subscribe(resp=>{
      if(!resp) alert("Error");
      else {
        this.nonApprovedTutors = resp;
      }
    })
    this.subjectService.getAll().subscribe(resp=>{
      if(!resp) alert("Error");
      else this.allSubjects = resp;
    })
  }

  displayPdf(r: User) {
    this.fileService.fetchPdf(r.request.cv).subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
      },
      error => {
        console.error('Error displaying PDF:', error);
      }
    );
  }

  add() {
    this.subjectService.add(this.subjectName).subscribe(resp=>{
      if(!resp) alert("Error");
      else alert("You added a new subejct.");
    })
  }

  approve(u:User) {
    this.regRequestService.approve(u.username).subscribe(resp=>{
      if(!resp) alert("Error");
      else {
        let arr = u.request.subjects.split(", ");
        arr = arr.filter(s=>this.allSubjects.find(e=>e.name===s)==undefined);
        arr.forEach(s=>{
          this.subjectService.add(s).subscribe(resp=>{if(!resp) alert("Error");})
        })
        arr = u.request.subjects.split(", ");
        arr.forEach(s=>{
          this.teachesService.add(u.username, s).subscribe(resp=>{if(!resp) alert("Error")});
        })
        this.ngOnInit();
      }
    })
  }

  deny(u:User) {
    this.regRequestService.deny(u.username).subscribe(resp=>{
      if(!resp) alert("Error");
      else this.ngOnInit();
    })
  }

  remove(t:User) {
    this.userService.removeTutor(t.username).subscribe(resp=>{
      if(!resp) alert("Error");
      else this.ngOnInit();
    })
  }

  update(u:User) {
    localStorage.setItem("toUpdate", JSON.stringify(u));
    this.router.navigate(['updateProfile']);
  }

}
