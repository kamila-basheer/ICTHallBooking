import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-hall',
  templateUrl: './book-hall.component.html',
  styleUrls: ['./book-hall.component.css']
})
export class BookHallComponent implements OnInit {
time={
  date: new Date(),
  fromtime:"09:00",
  totime:"11:15",
  hallname:""
}  
Halls=["Programming Hall","Knowledge Hall","Support Hall"]
message:any;
error:any;
errmsg:any

date = new Date();
mindate= new Date();
maxdate= this.date.setDate(this.date.getDate()+14);
Time = new Date();
currenthh = this.Time.getHours();
currentmm = this.Time.getMinutes();
currentdd=this.Time.getDate();
currentmon=this.Time.getMonth();
currentyy=this.Time.getUTCFullYear();
dd=this.time.date.getDate();
mm=this.time.date.getMonth();
yy=this.time.date.getUTCFullYear();


fromhh:any;
frommm:any;
tohh:any;
tomm:any;

maxtime ="23:59:00";
err:any;
DT:any



  constructor(private booking:BookingService, private route:Router) { }

  ngOnInit(): void {


  }

  timecheck()
  {
    this.DT = new Date(this.time.date)
    this.dd=this.DT.getDate();
    this.mm=this.DT.getMonth();
    this.yy=this.DT.getUTCFullYear();
    this.err=false;
    this.message=null;
    this.errmsg=null
//Time validation
this.fromhh=this.time.fromtime.split(":")[0];
this.fromhh=parseInt(this.fromhh)
this.frommm=this.time.fromtime.split(":")[1];
this.frommm=parseInt(this.frommm);

this.tohh=this.time.totime.split(":")[0];
this.tohh=parseInt(this.tohh);
this.tomm=this.time.totime.split(":")[1];
this.tomm=parseInt(this.tomm);
console.log(this.dd)
console.log((this.currentdd==this.dd)&&(this.fromhh<this.currenthh)&&(this.currentmon==this.mm)&&(this.currentyy==this.yy))
if(this.tohh<this.fromhh)
{
  this.errmsg="Please choose a valid time slot."
}
else if((this.fromhh==this.tohh) && (this.tomm-this.frommm)<15)
{
  console.log(this.tomm)
this.errmsg="Please select time slot with atleast minimum 15 minutes"
}
else if((this.currentdd==this.dd)&&(this.fromhh<this.currenthh)&&(this.currentmon==this.mm)&&(this.currentyy==this.yy))
{
  this.errmsg="Please choose a valid time slot.."
}
else if((this.fromhh==this.currenthh) && (this.frommm<this.currentmm)&&(this.currentdd==this.dd)&&(this.currentmon==this.mm)&&(this.currentyy==this.yy))
{
  console.log("hai")
  this.errmsg="Invalid time"
}
else
{
  this.booking.checkslot(this.time)
  .subscribe(res=>{
    if(!res){    
      this.err=true;
      this.message=null
  }    
  else
      {
        this.message=res;
       
        this.err=false;
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


 
    }

// bookhall()
// {
// this.booking.bookslot(this.message)
// .subscribe(res=>{
//   console.log(res)
// });
// alert("Booking confirmed");
// this.route.navigate(['/view-calendar'])

// }

bookhall()
{
this.booking.bookslot(this.message)
.subscribe(res=>{
  console.log(res)
});
}

viewcal()
{
  this.route.navigate(['/view-calendar'])
}

}
