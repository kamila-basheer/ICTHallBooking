import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-edit-calendar',
  templateUrl: './edit-calendar.component.html',
  styleUrls: ['./edit-calendar.component.css']
})
export class EditCalendarComponent implements OnInit {
  username:any
  bookinglist:any;
  id:any;
  i:any

  constructor(private bookingdata:BookingService,private route:Router) { }

  ngOnInit(): void {
    this.bookingdata.getbookingdata(this.username)
    .subscribe(data=>{
      this.bookinglist=data;
      // console.log(this.bookinglist);
      for(this.i of this.bookinglist)
      {

        this.i.fromTime=new Date(this.i.fromTime);
        this.i.toTime=new Date(this.i.toTime);
        
        this.i.Date=((this.i.Date).split('T')[0]);
        this.i.fromTime=((this.i.fromTime).toLocaleTimeString());
        this.i.toTime=((this.i.toTime).toLocaleTimeString());
        // this.i.fromTime = ((this.i.fromTime).split('T')[1]);
        // this.i.toTime = (this.i.toTime).split('T')[1];
        // this.i.fromTime = ((this.i.fromTime).split(':')[0])+":"+((this.i.fromTime).split(':')[1]);
        // this.i.toTime = (this.i.toTime).split(':')[0]+":"+((this.i.toTime).split(':')[1]);


      }
    },err=>{
      console.log(err.error.message);
      if(err.error.message=='Unauthorized'){
      this.route.navigate(['home']);}
      // this.errors=err.error.message;
      // alert(this.errors);
      // this.router.navigate(['home']);

    })
  }

  setitem(item:any){
    localStorage.setItem("Item",item)
     }
   
     removeitem(){
       localStorage.removeItem("Item")
     }
   
     deletebooking()
     {
   this.id= localStorage.getItem("Item");
   this.bookingdata.deletebooking(this.id)
   .subscribe(res=>{
     console.log("Removed");
   })
   window.location.reload();
     }

}
