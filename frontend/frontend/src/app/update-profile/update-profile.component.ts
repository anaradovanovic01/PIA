import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { User } from '../models/User';
import { RegRequest } from '../models/RegRequest';
import { RegRequestService } from '../services/reg_request.service';
import { FileService } from '../services/file.service';
import { SubjectService } from '../services/subject.service';
import { Subject } from '../models/Subject';
import { TeachesService } from '../services/teaches.service';
import { firstValueFrom, from } from 'rxjs';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent {

  constructor(private userService:UserService, private regRequestService: RegRequestService, private fileService:FileService,
    private router:Router, private app:AppComponent, private subjectService: SubjectService, private teachesService: TeachesService) { }

  firstname: string = "";
  lastname: string = "";
  address: string = "";
  contact : string = "";
  email : string = "";
  typeOfSchool: string = "";
  currentGrade: number = 0;
  subjects: string[] = [];
  age: string = "";
  imagePath: string = "";
  image: File | undefined;
  other: string = "";
  message: string = "";
  loggedIn: boolean = false;
  isImageValid: boolean = false;
  user: User = new User();
  loggedInUser: User = new User();
  allSubjects: Subject[] = [];

  ngOnInit(): void {
    let item = localStorage.getItem('loggedIn');
    if(item) this.loggedInUser = JSON.parse(item);
    if(this.loggedInUser.username == "") this.loggedIn = false;
    else {
      this.loggedIn = true;
      let item = localStorage.getItem('toUpdate');
      if(item) this.user = JSON.parse(item);
      this.firstname = this.user.firstname;
      this.lastname = this.user.lastname;
      this.address = this.user.address;
      this.contact = this.user.contact;
      this.email = this.user.email;
      if(this.user.type === "student") {
        this.typeOfSchool = this.user.typeOfSchool;
        this.currentGrade = this.user.currentGrade;
      } else if(this.user.type === "tutor") {
        this.age = this.user.request.age;
      }
      this.subjectService.getAll().subscribe(resp=>{
        if(!resp) alert("Error");
        else this.allSubjects = resp;
      })
    }
  }

  updateImage() {
    return new Promise(resolve=>{
      if(this.image) this.fileService.uploadFile(this.image).subscribe(resp=>{
        if(!resp) alert("Error while uploading profile image");
        else {
          this.imagePath = resp;
          this.userService.updateImage(this.user.username, this.imagePath).subscribe(resp=>{
            if (!resp) alert("Error!");
            else this.user.image = this.imagePath;
            resolve(true);
          })
        }
      })
    });
  }

  updateOtherData() {
    return new Promise(resolve=>{
      this.userService.update(this.user.username, this.user.type, this.firstname, this.lastname, this.address, this.contact, this.email, this.typeOfSchool,
      this.currentGrade).subscribe((resp)=>{
        if (!resp) alert("Error!");
        else {
          this.message = '';
          this.user.firstname = this.firstname;
          this.user.lastname = this.lastname;
          this.user.address = this.address;
          this.user.contact = this.contact;
          this.user.email = this.email;
          if(this.user.type === "student") {
            this.user.typeOfSchool = this.typeOfSchool;
            this.user.currentGrade = this.currentGrade;
            resolve(true);
          } else if(this.user.type === "tutor") {
            if(this.user.request.age != this.age) {
              this.regRequestService.updateAge(this.user.username, this.age).subscribe((resp)=>{
                if (!resp) alert("Error!");
                else {
                  this.user.request.age = this.age;                
                }
                resolve(true);
              })
            }else resolve(true);
          }
        }
      })
    });
  }

  removePromises: Promise<any>[] = [];
  addPromises: Promise<any>[] = [];

  updateSubjects() {
    this.user.subjects.forEach(s=>{
      const removePromise = firstValueFrom(this.teachesService.remove(this.user.username, s.name));
      this.removePromises.push(removePromise);
    })
    this.subjects.forEach(s=>{
      const addPromise = firstValueFrom(this.teachesService.add(this.user.username, s));
      this.addPromises.push(addPromise);
    })
  }

  successfulUpdate() {
    localStorage.removeItem("toUpdate");
    if(this.loggedInUser.type==="admin") this.router.navigate(['registrationRequests']);
    else {
      localStorage.setItem('loggedIn', JSON.stringify(this.user));
      alert("You have successfully updated your profile!");
      this.router.navigate(['/profile']);
    }
  }

  update() {
    if(this.image != undefined && this.isImageValid==false) {
      alert("The profile image you added is not valid. Try again!");
      return;
    }
    if(this.image != undefined) {
      this.updateImage().then(res=>{
        this.updateOtherData().then(res=>{
          if(this.subjects.length>0) {
            this.updateSubjects();
            Promise.all([...this.removePromises, ...this.addPromises]).then(res=>{
              this.successfulUpdate();
            })
          } else this.successfulUpdate();
        })
      })
    } else {
      this.updateOtherData().then(res=>{
        if(this.subjects.length>0) {
          this.updateSubjects();
          Promise.all([...this.removePromises, ...this.addPromises]).then(res=>{
            this.teachesService.getAllSubjectsForTutor(this.user.username).subscribe(resp=>{
              this.user.subjects=resp;
              localStorage.setItem("loggedIn", JSON.stringify(this.user));
              this.successfulUpdate();
            });
          })
        } else this.successfulUpdate();
      })
    }
  }

  onChange(event: any) {
    this.isImageValid = true;
    (event.target as HTMLInputElement).files;
    const filelist = (<HTMLInputElement>event.target).files;
    if (filelist != null) this.image = filelist[0];
    else this.image = undefined;
    if(this.image) {
      if(this.image.type != 'image/jpg' && this.image.type != 'image/png') {
        this.isImageValid = false;
        alert('The type of the image is not valid. The image must be either .png or .jpg.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const width = img.width;
          const height = img.height;
          if (width < 100 || height < 100 || width > 300 || height > 300) {
            this.isImageValid = false;
            alert('The dimensions of the image is not valid. The image must be between 100x100 and 300x300.');
            return;
          }
        };
      };
      reader.readAsDataURL(this.image);
    } else {
      this.isImageValid = false;
    }
  }

}
