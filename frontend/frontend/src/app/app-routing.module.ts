import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { RegisterTutorComponent } from './register-tutor/register-tutor.component';
import { RegistationRequestsComponent } from './registation-requests/registation-requests.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ViewTutorsComponent } from './view-tutors/view-tutors.component';
import { ViewTutorProfileComponent } from './view-tutor-profile/view-tutor-profile.component';
import { ClassesStudentComponent } from './classes-student/classes-student.component';
import { ClassesTutorComponent } from './classes-tutor/classes-tutor.component';
import { TutorsStudentsComponent } from './tutors-students/tutors-students.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import { ChartsComponent } from './charts/charts.component';
import { SecurityQuestionComponent } from './security-question/security-question.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [ 
  { path: "", component: AboutComponent},
  { path: "login", component: LoginComponent},
  { path: "register", component: RegisterComponent},
  { path: "registerTutor", component: RegisterTutorComponent},
  { path: "loginadmin", component: LoginAdminComponent},
  { path: "loginAdmin", component: LoginAdminComponent},
  { path: "profile", component: ProfileComponent},
  { path: "registrationRequests", component: RegistationRequestsComponent},
  { path: "changePassword", component: ChangePasswordComponent},
  { path: "securityQuestion", component: SecurityQuestionComponent},
  { path: "updateProfile", component: UpdateProfileComponent},
  { path: "tutors", component: ViewTutorsComponent},
  { path: "view-tutor-profile", component: ViewTutorProfileComponent},
  { path: "classesStudent", component: ClassesStudentComponent},
  { path: "classesTutor", component: ClassesTutorComponent},
  { path: "tutorsStudents", component: TutorsStudentsComponent},
  { path: "view-student", component: ViewStudentComponent},
  { path: "charts", component: ChartsComponent},
  { path: "notifications", component: NotificationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
