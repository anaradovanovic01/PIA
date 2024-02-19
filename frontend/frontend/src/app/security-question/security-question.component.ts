import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-security-question',
  templateUrl: './security-question.component.html',
  styleUrls: ['./security-question.component.css']
})
export class SecurityQuestionComponent {
  constructor(private service: UserService, public router: Router) { }

  ngOnInit() {
    let item = localStorage.getItem('loggedIn')
    if(item) this.user = JSON.parse(item);
    if(this.user.username == "") this.loggedIn = false;
    else this.loggedIn = true;
    item = localStorage.getItem("question");
    if(item) this.user = JSON.parse(item);
    this.question = this.user.question;
  }

  loggedIn: boolean = false;
  user: User = new User();
  question: string = "";
  answer: string = "";
  new: string = "";
  confirm: string = "";
  message: string = "";

  save() {
    if(this.answer == "" || this.new == "" || this.confirm == "") {
      this.message = "Please fill out all fields before continuing."; 
      return;
    }
    this.service.checkSecurityQuestion(this.user.username, this.answer).subscribe((user: boolean)=>{
      if(!user) {
        this.message = 'You did not answer the security question correctly!';
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
              alert("You have successfully changed the password.");
              this.router.navigate(['login']);
            }
            else 
              this.message = "Error";
          })
        }
      }
    })
  }
}
