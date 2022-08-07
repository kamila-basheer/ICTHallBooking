import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  bookings:any
  users:any

  constructor(private booking:BookingService, private authService:AuthService, private route:Router) { }

  ngOnInit(): void {
    this.booking.getbookingsdata()
    .subscribe(res=>{
    this.bookings=res;
    this.bookings=this.bookings.length;
    });
    
    this.authService.getAssociates()
    .subscribe(data=>{
      this.users=data;
      this.users=this.users.length
    })
      }
    
      userbtn()
      {
        this.route.navigate(["admin-dashboard/manage-associates"])
      }
      bookingbtn()
      {
        this.route.navigate(["admin-dashboard/manage-bookings"])
      }
      logout(){
    this.authService.logoutUser();
      }
    
    }
