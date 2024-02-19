import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {

  constructor(private service: UserService, public router: Router, public app: AppComponent) { }

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
    this.service.login(this.username, this.password).subscribe(user=>{
      if(!user){
        this.message = 'Invalid data';
      } else {
        this.message = '';
        if(user.type != "admin") {
          alert("Error! This page is for administrators only!");
          this.router.navigate(['login']);
        }
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
