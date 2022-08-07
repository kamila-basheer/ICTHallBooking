import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { BookingService } from '../booking.service';


@Component({
  selector: 'app-view-calendar',
  templateUrl: './view-calendar.component.html',
  styleUrls: ['./view-calendar.component.css']
})
export class ViewCalendarComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    // events: [
    //   { title: 'event 1', date: '2022-07-24' },
    //   { title: 'event 1.2', date: '2022-07-24' },
    //   { title: 'event 2', date: '2019-04-02' }
    // ]
    events:''

    
  };
  // username="testing"
  
  username:any
  bookings:any
  i:any
  id:any;
  // id:any
  // bookinglist:any;
  slots:Array<any>=[]
  limit:Number =0
  count:number=0
  booking={
    title:'',
    date:'',
    backgroundColor:'',
    display:'',
    time:0,
    
  }
  from:any
  




  constructor(private bookingservice:BookingService,private router:Router ) { }

  ngOnInit(): void {
    this.bookingservice.getbookingdetails(this.username)
    .subscribe(res=>{
      this.bookings=res;
      console.log(this.bookings[0].Date);
      this.limit = this.bookings.length;

      for (this.i of this.bookings)
      {
        this.booking.title=this.i.hallName;
        this.booking.date=this.i.Date.split("T")[0];
        this.i.Date=this.booking.date;
        console.log(this.booking.date)
        this.booking.backgroundColor="red";
        this.booking.display="auto";
        this.slots.push(this.booking);
        this.booking={title:'',date:'', backgroundColor:'',display:'',time:0}
        // this.from=this.i.fromTime.split("T")[1];
        // this.from=this.from.split(".")[0];
        // this.i.fromTime = ((this.i.fromTime).split('T')[1]);
        // this.i.toTime = (this.i.toTime).split('T')[1];
        // this.i.fromTime = ((this.i.fromTime).split(':')[0])+":"+((this.i.fromTime).split(':')[1]);
        // this.i.toTime = (this.i.toTime).split(':')[0]+":"+((this.i.toTime).split(':')[1]);
        this.i.fromTime=new Date(this.i.fromTime);
        this.i.toTime=new Date(this.i.toTime);
        this.i.fromTime=((this.i.fromTime).toLocaleTimeString());
        this.i.toTime=((this.i.toTime).toLocaleTimeString());
        
      
        this.booking.time=this.i.fromTime-this.i.toTime;
      }
      this.calendarOptions.events=this.slots;
      console.log(this.slots)
    },err=>{
      console.log(err.error.message);
      if(err.error.message=='Unauthorized'){
      this.router.navigate(['home']);}
      // this.errors=err.error.message;
      // alert(this.errors);
      // this.router.navigate(['home']);

    })

    
  }

  

}
