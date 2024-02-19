import { Component } from '@angular/core';
import { RegRequestService } from '../services/reg_request.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { FileService } from '../services/file.service';
import { SubjectService } from '../services/subject.service';
import { Subject } from '../models/Subject';

@Component({
  selector: 'app-register-tutor',
  templateUrl: './register-tutor.component.html',
  styleUrls: ['./register-tutor.component.css']
})
export class RegisterTutorComponent {

  constructor(private regRequestService:RegRequestService, private router:Router, private app:AppComponent, private fileService:FileService,
    private subjectService:SubjectService) { }

  ngOnInit(): void {
    let item = localStorage.getItem('loggedIn');
    if(item) this.loggedIn = true;
    item = localStorage.getItem("username");
    if(item) this.username = item;
    if(this.username == "") {
      alert("Error! You are not authorized to be on this page.");
      this.router.navigate(['register']);
    }
    this.subjectService.getAll().subscribe(resp=>{
      if(!resp) alert("Error");
      else this.allSubjects = resp;
    })
  }

  username: string = "";
  cv: File | undefined;
  subjects: string[] = [];
  age: string = "";
  where: string = "";
  other: string = "";
  message: string = "";
  loggedIn: boolean= false;
  isFileValid: boolean = false;
  allSubjects: Subject[] = [];

  register() {
    if(this.cv == undefined || (this.subjects.length==0 && this.other == "") || this.age == "" || this.where == "") {
      this.message = "Please fill out all fields before continuing."; 
      return;
    }
    let subjectsStr = "";
    this.subjects.forEach(s=>subjectsStr+=s+', ');
    if(this.other != "") subjectsStr += this.other + ', ';
    subjectsStr = subjectsStr.slice(0, subjectsStr.length-2);
    if(!this.isFileValid) {
      alert("The file you added is not valid. Try again!");
      return;
    }
    this.fileService.uploadFile(this.cv).subscribe(cvPath=>{
      if(!cvPath) alert("Error while uploading profile file");
      else {
        this.regRequestService.register(this.username, cvPath, subjectsStr, this.age, this.where).subscribe((resp) => {
          if(resp == 0) {
            this.message = "Invalid data";
          }
          else {
            localStorage.removeItem("username");
              alert("You have successfully signed up!");
              this.router.navigate(['/login']);
          }
        });
      }
    })
  }

  onChange(event: any) {
    this.isFileValid = true;
    (event.target as HTMLInputElement).files;
    const filelist = (<HTMLInputElement>event.target).files;
    if (filelist != null) this.cv = filelist[0];
    else this.cv = undefined;
    if(this.cv && this.cv.type != 'application/pdf') {
      this.isFileValid = false;
      alert("The file must be .pdf.")
      return;
    } else if(this.cv && this.cv.size > 3000000) {
        this.isFileValid = false;
        alert("The file is too big. It must be under 3MB.")
        return;
    } else {
      const reader = new FileReader();
      if(this.cv) reader.readAsDataURL(this.cv);
    }
  }

  logout() {
    this.app.logout();
  }

  profile() {
    this.app.profile();
  }

}
