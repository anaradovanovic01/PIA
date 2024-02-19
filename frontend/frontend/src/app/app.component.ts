import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router:Router) {}

  loggedIn: boolean = false;
  type: string = "";

  ngOnInit(): void {
    let user = localStorage.getItem('loggedIn');
    if(!user) this.loggedIn = false;
    else  {
      this.loggedIn = true;
      this.type = JSON.parse(user).type;
    }
  }
  
  logout() {
    localStorage.clear();
    this.loggedIn = false;
    alert("You have succesfully logged out.");
    this.router.navigate(['']);
  }

  profile() {
    let item = localStorage.getItem('loggedIn');
    if(item) {
      let user: User = JSON.parse(item);
      if(user.type == "student" || user.type == "tutor") this.router.navigate(['/profile']);
      if(user.type == "admin") this.router.navigate(['/charts']);
    }  
  }
}
