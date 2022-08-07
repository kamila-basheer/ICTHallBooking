import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditBookingComponent implements OnInit {

  time={
    DATE: new Date(),
    fromTime:'',
    toTime:'',
    hallname:'',
    associateName:'',
    associateEmail:'',
  _id:0
  }
    
    Halls=["Programming Hall","Knowledge Hall","Support Hall"];
    id:any;
    bookingdetails:any;

  constructor(private booking:BookingService, private route:Router, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedroute.snapshot.paramMap.get("id");
    this.booking.getbookingitem(this.id)
    .subscribe(res=>{
    this.bookingdetails=res;
    console.log(this.bookingdetails);
    this.bookingdetails.fromTime=new Date(this.bookingdetails.fromTime);
    this.bookingdetails.toTime=new Date(this.bookingdetails.toTime);
          
    this.bookingdetails.Date=((this.bookingdetails.Date).split('T')[0]);
    this.bookingdetails.fromTime = ((this.bookingdetails.fromTime).toLocaleTimeString());
    this.bookingdetails.toTime = ((this.bookingdetails.toTime).toLocaleTimeString())
    this.time.hallname=this.bookingdetails.hallName;
    this.time.DATE=this.bookingdetails.Date
    this.time.fromTime=this.bookingdetails.fromTime;
    this.time.associateName=this.bookingdetails.associateName;
    this.time.associateEmail=this.bookingdetails.associateName;
    this.time._id=this.id;
    console.log(this.bookingdetails.fromTime)
    
    if(this.bookingdetails.fromTime.split(" ")[1]==="PM")
    {
      this.bookingdetails.fromTime= parseInt(this.bookingdetails.fromTime.split(":")[0])+ 12 +":"+ this.bookingdetails.fromTime.split(":",2)[1];
    }
    if(this.bookingdetails.toTime.split(" ")[1]==="PM")
    {
      this.bookingdetails.toTime= parseInt(this.bookingdetails.toTime.split(":")[0] ) + 12 +":"+ this.bookingdetails.toTime.split(":",2)[1];
      console.log(this.bookingdetails.toTime)
    }
    this.time.fromTime=this.bookingdetails.fromTime.split(":",2)[0]+":"+this.bookingdetails.fromTime.split(":",2)[1];
    console.log(this.time.fromTime)
    if((parseInt((this.time.fromTime).split(":")[0]))<10)
    {
      this.time.fromTime.split(":")[0]="0"+this.time.fromTime.split(":")[0];
      this.time.fromTime="0"+this.time.fromTime;
    }
    
    this.time.toTime=this.bookingdetails.toTime;
    this.time.toTime=this.bookingdetails.toTime.split(" ")[0];
    
    
    if(parseInt(this.time.toTime.split(":")[0])<10)
    {
      console.log((this.time.toTime.split(":")[0]))
      this.time.toTime="0"+this.time.toTime;
    
    }  });
      
        }
    
        date = new Date();
        mindate= new Date();
        maxdate= this.date.setDate(this.date.getDate()+14);
        Time = new Date();
        currenthh = this.Time.getHours();
        currentmm = this.Time.getMinutes();
        currentdd=this.Time.getDate();
        currentmon=this.Time.getMonth();
        currentyy=this.Time.getUTCFullYear();
        dd=this.time.DATE.getDate();
        mm=this.time.DATE.getMonth();
        yy=this.time.DATE.getUTCFullYear();
    
        fromhh:any;
    frommm:any;
    tohh:any;
    tomm:any;
    
    maxtime ="23:59:00";
    err:any;
    DT:any;
    msgdate:any;
    msgfrom:any;
    msgto:any;
    message:any;
    errmsg:any
    
    admcheckslot()
    {
      
        this.DT = new Date(this.time.DATE);
        this.dd=this.DT.getDate();
        this.mm=this.DT.getMonth();
        this.yy=this.DT.getUTCFullYear();
        this.err=false;
        this.message=null;
        this.errmsg=null
    //Time validation
    this.fromhh=this.time.fromTime.split(":")[0];
    this.fromhh=parseInt(this.fromhh)
    this.frommm=this.time.fromTime.split(":")[1];
    this.frommm=parseInt(this.frommm);
    
    this.tohh=this.time.toTime.split(":")[0];
    this.tohh=parseInt(this.tohh);
    this.tomm=this.time.toTime.split(":")[1];
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
      console.log(this.time)
      this.booking.admcheckslot(this.time)
      .subscribe(res=>{
        if(!res){    
          this.err=true;
          this.message=null
      }    
      else
          {
            
            this.message=res;
            console.log(this.message)
            this.msgdate=this.message.Date.split("T")[0];
            this.msgto=this.message.toTime.split("T")[1];
            this.msgfrom=this.message.fromTime.split("T")[1];
            this.err=false;
        }
        })
    }
    }    
    
    bookhall()
    {
    this.booking.admupdatebooking(this.message)
    .subscribe(res=>{
      console.log(res)
    });
    }
    viewbookings()
    {
      this.route.navigate(['admin-dashboard/manage-bookings'])
    }
    
        
    
    
    }
