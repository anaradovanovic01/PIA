import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { User } from '../models/User';
import { Notification } from '../models/Notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  constructor(private router:Router, private notificationService:NotificationService) {}

  user: User = new User();
  loggedIn: boolean = false;
  newNotifications: Notification[] = [];
  seenNotifications: Notification[] = [];

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
    this.notificationService.getAllNewForStudent(this.user.username).subscribe(resp=>{
      if(!resp) alert("Error");
      else {
        this.newNotifications = resp;
        this.newNotifications.forEach(n=>{
          this.notificationService.seen(n.id).subscribe(resp=>{if(!resp) alert("Error")})
        })
      }
    });
    this.notificationService.getAllSeenForStudent(this.user.username).subscribe(resp=>{
      if(!resp) alert("Error");
      else this.seenNotifications = resp;
    });
  }
}
