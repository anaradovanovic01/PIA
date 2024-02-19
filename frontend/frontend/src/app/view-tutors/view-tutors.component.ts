import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { ClassService } from '../services/class.service';
import { Router } from '@angular/router';
import { TeachesService } from '../services/teaches.service';
import { RegRequestService } from '../services/reg_request.service';

@Component({
  selector: 'app-view-tutors',
  templateUrl: './view-tutors.component.html',
  styleUrls: ['./view-tutors.component.css']
})
export class ViewTutorsComponent implements OnInit {

  constructor(private userService:UserService, private regRequestService:RegRequestService, private classesService:ClassService, private teachesService:TeachesService, private router:Router) {}

  user:User = new User();
  loggedIn:boolean = false;
  tutors: User[] = [];
  subjects: string[] = [];
  allSubjects: string[] = [];
  map = new Map<string, string[][]>();
  wholeMap = new Map<string, string[][]>();
  param: string = "subject";
  order: string = "asc";
  subject: string = "";
  firstname: string = "";
  lastname: string = "";
  age: string = "";

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
    if(this.user.typeOfSchool != "Primary school") this.age = "High school";
    else if(this.user.typeOfSchool === "Primary school" && this.user.currentGrade <= 4) this.age = "Primary school - 1-4 grade";
    else this.age = "Primary school - 5-8 grade";
    this.userService.getApprovedTutors().subscribe(tutors=>this.tutors=tutors);
    this.teachesService.getSubjects().subscribe(subjects=>{
      this.subjects = subjects;
      this.allSubjects = subjects;
      this.subjects.forEach(s=>{
        this.teachesService.getAllTutorForSubject(s).subscribe(tutors=>{
          let tutorsList: string[][] = [];
          let promises: Promise<any>[] = [];
          tutors.forEach(t=>{
            promises.push(new Promise<void>((resolve, reject) => {
              this.userService.getUser(t).subscribe(user=>{
                this.classesService.getRatingForTutor(user.username).subscribe(rating=>{
                  let list: string[] = [];
                  list.push(user.firstname);
                  list.push(user.lastname);
                  list.push(String(rating.toFixed(2)));
                  list.push(user.username);
                  this.regRequestService.getRequest(user.username).subscribe(request=>{
                    if(request.age === this.age) {
                      list.push(request.age);
                      tutorsList.push(list);
                    }
                    resolve();
                  })
                })
              })
            }))
          })
          Promise.all(promises).then(() =>{
            if(tutorsList.length > 0) {
              this.map.set(s, tutorsList);
              this.wholeMap.set(s, tutorsList);
            } else {
              this.subjects = this.subjects.filter(e=>e!=s);
              this.allSubjects = this.allSubjects.filter(e=>e!=s);
            }
          }) 
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

  viewTutorProfile(username: string) {
    let tutor = this.tutors.find(t=>t.username==username);
    if(tutor != undefined) localStorage.setItem("tutor", JSON.stringify(tutor));
    this.router.navigate(['view-tutor-profile']);
  }

}
