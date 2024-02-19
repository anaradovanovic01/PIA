import { Component } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  constructor(private service: UserService, public app: AppComponent, private router:Router) { }

  ngOnInit() {
    let item = localStorage.getItem('loggedIn')
    if(item) this.user = JSON.parse(item);
    if(this.user.username != "") this.loggedIn = true;
    else this.loggedIn = false;
  }

  user: User = new User();
  loggedIn: boolean = false;
  old: string = "";
  new: string = "";
  confirm: string = "";
  username: string = "";
  message: string = "";
  message2: string = "";

  save() {
    if(this.old == "" || this.new == "" || this.confirm == "") {
      this.message = "Please fill out all fields before continuing."; 
      return;
    }
    if(this.user.username == "") {
      alert("You have to login to change you password like this.");
      return;
    }
    this.service.login(this.user.username, this.old).subscribe((user: User)=>{
      if(!user){
        this.message = 'The old password is not correct!';
      } else {
        if(this.new !== this.confirm) {
          this.message = "The new password and the cofirmed password do not match!"
        }
        else {
          let regex = /^(?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z][A-Za-z0-9!@#$%^&*()-_+=]{5,9}$/
          if(!regex.test(this.new)) {
            this.message = "Password must be between 6 and 10 characters long and have at least 1 upper case letter, 3 lower case letters and 1 special character and it must start with a letter."
            return;
          }
          this.service.changePassword(this.user.username, this.new).subscribe(resp=>{
            if (resp>0) {
              this.message = '';
              alert("You have successfully changed the password.")
              this.app.profile();
            }
            else 
              this.message = "Error";
          })
        }
      }
    })
  }

  securityQuestion() {
    if(this.username === "") {
      this.message2 = "Please fill out your username before continuing."; 
      return;
    }
    this.service.getUser(this.username).subscribe(user=>{
      if(!user) {
        alert("User with this username does not exist.");
        return;
      }
      localStorage.setItem("question", JSON.stringify(user));
      this.router.navigate(['securityQuestion']);
    })
  }

}
