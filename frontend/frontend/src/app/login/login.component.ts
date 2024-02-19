import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { UserService } from '../services/user.service';
import { RegRequestService } from '../services/reg_request.service';
import { TeachesService } from '../services/teaches.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private userService: UserService, private regRequestService: RegRequestService, public app: AppComponent, private teachesService:TeachesService) { }

  ngOnInit(): void {
    let user = localStorage.getItem('loggedIn');
    if(!user) this.loggedIn = false;
    else this.loggedIn = true;
  }

  username: string = '';
  password: string = '';
  message: string = '';
  loggedIn: boolean = false;

  login(){
    if(!this.username || !this.password) {
      this.message = "Please fill out all fields before continuing."; 
      return;
    }
    this.userService.login(this.username, this.password).subscribe(user=>{
      if(!user){
        this.message = 'Invalid data';
      } else {
        if(user.type==="admin") {
          this.message = "Type of user is admin! This page is not for admin login!";
          return;
        }
        if(user.type==="tutor" && user.request.approved==false) {
          this.message = "Your account has not been approved yet.";
          return;
        } 
        this.message = '';
        if(user.type==="tutor") this.teachesService.getAllSubjectsForTutor(user.username).subscribe(resp=>{
          user.subjects = resp;
          localStorage.setItem('loggedIn', JSON.stringify(user));
          this.app.ngOnInit();
          this.app.profile();
        }) 
        else {
          localStorage.setItem('loggedIn', JSON.stringify(user));
          this.app.ngOnInit();
          this.app.profile();
        }
      }
    })
  }

  logout() {
    this.app.logout();
  }

  profile() {
    this.app.profile();
  }

}
