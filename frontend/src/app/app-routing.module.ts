import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAssocaitesComponent } from './admin-associates/admin-assocaites.component';
import { AdminBookingsComponent } from './admin-bookings/admin-bookings.component';
import { AdminDashoardComponent } from './admin-dashoard/admin-dashoard.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AuthGuard } from './auth.guard';
import { BookHallComponent } from './book-hall/book-hall.component';
import { CurrentBookingComponent } from './current-booking/current-booking.component';
import { EditAssociateComponent } from './edit-associate/edit-associate.component';
import { EditBookingComponent } from './edit-booking/edit-booking.component';
import { EditCalendarComponent } from './edit-calendar/edit-calendar.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { ViewCalendarComponent } from './view-calendar/view-calendar.component';

const routes: Routes = [
  {path:"book-your-hall",
  canActivate:[AuthGuard],
  canLoad:[AuthGuard],
  component:BookHallComponent},
  {path:"view-calendar", 
  canActivate:[AuthGuard],
  canLoad:[AuthGuard], 
  component:ViewCalendarComponent},
  {path:"dashboard", 
  canActivate:[AuthGuard],
  canLoad:[AuthGuard],
  component:UserDashboardComponent},
  {path:"edit-calendar",
  canActivate:[AuthGuard],
  canLoad:[AuthGuard],
  component:EditCalendarComponent},
  {path:"current-bookings",
  canActivate:[AuthGuard],
  canLoad:[AuthGuard],
  component:CurrentBookingComponent},
  {path:"admin-dashboard",
  canActivate:[AuthGuard],
  canLoad:[AuthGuard],
  component:AdminDashoardComponent,
  children:[
  {path:'manage-bookings',canActivate:[AuthGuard],component:AdminBookingsComponent},
  {path:'edit-booking/:id',canActivate:[AuthGuard],component:EditBookingComponent},
  {path:'manage-associates',canActivate:[AuthGuard],component:AdminAssocaitesComponent},
  {path:'home',component:AdminHomeComponent},
  {path:'edit-associate',component:EditAssociateComponent}]},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: SignupComponent},
  {path: 'login', component: UserloginComponent},
  {path:'adm-login', component:AdminloginComponent}
  // {path:'manage-associates',canActivate:[AuthGuard],canLoad:[AuthGuard], component:AdminAssocaitesComponent},
  // {path:'manage-bookings',canActivate:[AuthGuard],canLoad:[AuthGuard], component:AdminBookingsComponent},
  // {path:'edit-associate',canActivate:[AuthGuard],canLoad:[AuthGuard], component:EditAssociateComponent},
  // {path:'adm-home',canActivate:[AuthGuard],canLoad:[AuthGuard],component:AdminHomeComponent},
  // {path:'edit-booking/:id',canActivate:[AuthGuard],canLoad:[AuthGuard], component:EditBookingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
