import { Component } from '@angular/core';
import { User } from '../models/User';
import { RegRequest } from '../models/RegRequest';
import { Router } from '@angular/router';
import { Subject } from '../models/Subject';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private router:Router) {}

  ngOnInit(): void {
    let item = localStorage.getItem('loggedIn');
    if(item) this.user = JSON.parse(item);
    if(this.user.username == "") this.loggedIn = false;
    else {
      this.loggedIn = true;
      if(this.user.type==="tutor") {
        this.user.subjects.forEach(s=>this.subjectsStr+=s.name+", "); 
      }
      this.subjectsStr = this.subjectsStr.slice(0, this.subjectsStr.length-2);
      let apiUrl = `http://localhost:8080/files/${this.user.image}`;
      this.imageUrl = apiUrl;
    }
  }

  user: User = new User();
  loggedIn: boolean = false;
  imageUrl: string = "";
  subjectsStr: string = "";

  update() {
    localStorage.setItem("toUpdate", JSON.stringify(this.user));
    this.router.navigate(['updateProfile']);
  }

}
