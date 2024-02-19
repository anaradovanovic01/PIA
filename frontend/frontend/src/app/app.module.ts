import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { RegisterTutorComponent } from './register-tutor/register-tutor.component';
import { RegistationRequestsComponent } from './registation-requests/registation-requests.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { CountUpDirective } from './count-up.directive';
import { ViewTutorsComponent } from './view-tutors/view-tutors.component';
import { ViewTutorProfileComponent } from './view-tutor-profile/view-tutor-profile.component';
import { ClassesStudentComponent } from './classes-student/classes-student.component';
import { ClassesTutorComponent } from './classes-tutor/classes-tutor.component';
import { TutorsStudentsComponent } from './tutors-students/tutors-students.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import { ChartsComponent } from './charts/charts.component';
import { SecurityQuestionComponent } from './security-question/security-question.component';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LoginAdminComponent,
    RegisterTutorComponent,
    RegistationRequestsComponent,
    ChangePasswordComponent,
    AboutComponent,
    ProfileComponent,
    UpdateProfileComponent,
    CountUpDirective,
    ViewTutorsComponent,
    ViewTutorProfileComponent,
    ClassesStudentComponent,
    ClassesTutorComponent,
    TutorsStudentsComponent,
    ViewStudentComponent,
    ChartsComponent,
    SecurityQuestionComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
