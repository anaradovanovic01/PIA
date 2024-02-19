import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ClassService } from '../services/class.service';
import { Class } from '../models/Class';
import { TeachesService } from '../services/teaches.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private userService:UserService, private classService:ClassService, private teachesService:TeachesService, private router:Router) {}

  studentCount: number = 0;
  tutorCount: number = 0;
  tutors: User[] = [];
  classesCountWeek: number = 0;
  classesCountMonth: number = 0;
  subjects: string[] = [];
  allSubjects: string[] = [];
  map = new Map<string, string[][]>();
  wholeMap = new Map<string, string[][]>();
  param: string = "subject";
  order: string = "asc";
  subject: string = "";
  firstname: string = "";
  lastname: string = "";
  duration: number = 1000;

  ngOnInit(): void {
    this.userService.getStudentCount().subscribe(students=>this.studentCount=students);
    this.userService.getApprovedTutors().subscribe(tutors=>{ this.tutors=tutors; this.tutorCount=tutors.length; });
    this.classService.getClassesCountLastWeek().subscribe(classes=>this.classesCountWeek=classes);
    this.classService.getClassesCountLastMonth().subscribe(classes=>this.classesCountMonth=classes);
    this.teachesService.getSubjects().subscribe(subjects=>{
      this.subjects = subjects;
      this.allSubjects = subjects;
      this.subjects.forEach(s=>{
        this.teachesService.getAllTutorForSubject(s).subscribe(tutors=>{
          let tutorsList: string[][] = [];
          tutors.forEach(t=>{
            this.userService.getUser(t).subscribe(user=>{
              let list: string[] = [];
              list.push(user.firstname);
              list.push(user.lastname);
              tutorsList.push(list);
            })
          })
          this.map.set(s, tutorsList);
          this.wholeMap.set(s, tutorsList);
        })
      })
    });
  }

  sort() {
    if(this.param === "subject" && this.order==="asc") {
      this.subjects = this.subjects.sort();
    }
    if(this.param === "subject" && this.order==="desc") {
      this.subjects = this.subjects.sort().reverse();
    }
    if(this.param === "firstname") {
      this.subjects.forEach(s=>{
        let list = this.map.get(s);
        if(list) {
          list.sort((a,b)=>{
          if(a[0]===b[0]) return 0;
          else if(a[0]>b[0]) return 1;
          else return -1;
          })
          if(this.order==="desc") list = list.reverse();
          this.map.set(s, list);
        }
      })
    }
    if(this.param === "lastname") {
      this.subjects.forEach(s=>{
        let list = this.map.get(s);
        if(list) {
          list.sort((a,b)=>{
          if(a[1]===b[1]) return 0;
          else if(a[1]>b[1]) return 1;
          else return -1;
          })
          if(this.order==="desc") list = list.reverse();
          this.map.set(s, list);
        }
      })
    }
  }

  search() {
    this.subjects = this.allSubjects;
    if(this.subject != "") {
      this.subjects = this.subjects.filter(s=>{
        return s.includes(this.subject);
      })
    }
    if(this.firstname != "") {
      this.subjects = this.subjects.filter(s=>{
        let list = this.wholeMap.get(s);
        if(list) {
          list = list.filter(e=>{return e[0].includes(this.firstname)})
          if(list.length == 0) {
            this.map.delete(s);
            return false;
          }
          else {
            this.map.set(s, list);
            return true;
          }
        } else return false;
      })
    }
    if(this.lastname != "") {
      this.subjects = this.subjects.filter(s=>{
        let list = this.wholeMap.get(s);
        if(list) {
          list = list.filter(e=>{return e[1].includes(this.lastname)})
          if(list.length == 0) {
            this.map.delete(s);
            return false;
          }
          else {
            this.map.set(s, list);
            return true;
          }
        } else return false;
      })
    }
  }  

}