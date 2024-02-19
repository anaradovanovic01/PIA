import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private userService:UserService, private router:Router, private app:AppComponent, private fileService:FileService) { }

  ngOnInit(): void {
    let user = localStorage.getItem('loggedIn');
    if(user) this.loggedIn = true;
    const path = "/../assets/avatar.png";
    this.fileService.getImageFile(path).subscribe((file) => {
      this.defaultImage = file;
    });
  }

  username: string = "";
  password: string = "";
  question: string = "";
  answer: string = "";
  type: string = "";
  firstname: string = "";
  lastname: string = "";
  gender: string = "";
  address : string = "";
  contact: string = "";
  email : string = "";
  typeOfSchool: string = "";
  currentGrade: number = 1;
  imagePath: string = "";
  image: File | undefined;
  defaultImage: File | undefined;
  message: string = "";
  loggedIn: boolean= false;
  isImageValid: boolean = false;

  register() {
    if(this.username == "" || this.password == "" || this.question == "" || this.answer == "" || this.type == "" || this.firstname == ""
     || this.lastname == "" || this.address == "" || this.contact == "" || this.gender == "" || this.email == "" || 
     (this.type == "student" && this.typeOfSchool == "")) {
      this.message = "Please fill out all fields before continuing."; 
      return;
    }
    let regex = /^(?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z][A-Za-z0-9!@#$%^&*()-_+=]{5,9}$/
    if(!regex.test(this.password)) {
      this.message = "Password must be between 6 and 10 characters long and have at least 1 upper case letter, 3 lower case letters and 1 special character and it must start with a letter."
      return;
    }
    this.userService.getUser(this.username).subscribe((resp) => {
      if(resp) this.message = "Username is already taken."
      else {
        this.userService.getUserByEmail(this.email).subscribe((resp) => {
          if(resp) this.message = "There is already a profile with this email."
          else {
            if(this.image != undefined && this.isImageValid==false) {
              alert("The profile image you added is not valid. Try again!");
              return;
            }
            if(this.image == undefined) this.image = this.defaultImage;
            if(this.image) this.fileService.uploadFile(this.image).subscribe(resp=>{
              if(!resp) alert("Error while uploading profile image");
              else {
                this.imagePath = resp;
                this.userService.register(this.username, this.password, this.question, this.answer, this.type, this.firstname, this.lastname, this.gender, this.address,
                  this.contact, this.email, this.imagePath, this.typeOfSchool, this.currentGrade).subscribe((resp)=>{
                    if(resp == 0) {
                      this.message = "Invalid data";
                    }
                    else {
                      this.message = "";
                      if(this.type == "student") {
                        alert("You have successfully signed up!");
                        this.router.navigate(['/login']);
                      } else {
                        localStorage.setItem("username", this.username);
                        this.router.navigate(['/registerTutor']);
                      }
                    }
                })
              }
            })
          }
        })
      }
    });
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

  logout() {
    this.app.logout();
  }

  profile() {
    this.app.profile();
  }
}
