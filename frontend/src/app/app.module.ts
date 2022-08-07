import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookHallComponent } from './book-hall/book-hall.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter'; 
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import { ViewCalendarComponent } from './view-calendar/view-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction';
import {MatSelectModule} from '@angular/material/select';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {SignupComponent} from './signup/signup.component';
import {MatDividerModule} from '@angular/material/divider';

import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AuthService} from './auth.service';
import {SidebarModule} from 'ng-sidebar';
import {TokenInterceptorService} from './token-interceptor.service';
import { EditCalendarComponent } from './edit-calendar/edit-calendar.component';
import { CurrentBookingComponent } from './current-booking/current-booking.component';
import { AdminDashoardComponent } from './admin-dashoard/admin-dashoard.component';
import { AdminBookingsComponent } from './admin-bookings/admin-bookings.component';
import { AdminAssocaitesComponent } from './admin-associates/admin-assocaites.component';
import { EditAssociateComponent } from './edit-associate/edit-associate.component';
import { EditBookingComponent } from './edit-booking/edit-booking.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    BookHallComponent,
    ViewCalendarComponent,
    UserDashboardComponent,
    UserloginComponent,
    AdminloginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    EditCalendarComponent,
    CurrentBookingComponent,
    AdminDashoardComponent,
    AdminBookingsComponent,
    AdminAssocaitesComponent,
    EditAssociateComponent,
    EditBookingComponent,
    AdminHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule, 
    MatMomentDateModule,
    FullCalendarModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,  
    MatDividerModule,
    SidebarModule.forRoot()

  ],
  providers: [{provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}, deps: [MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
               AuthService,
              {provide: HTTP_INTERCEPTORS, useClass:TokenInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
