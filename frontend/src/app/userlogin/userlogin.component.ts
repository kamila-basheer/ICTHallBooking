import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {
  errors=null
  loginUserData = {email:'',
  password:'',
  
  };
  

  constructor(private _auth:AuthService, public router:Router) { }

  ngOnInit(): void {
    
  }

  loginUser(){
    localStorage.setItem("username", this.loginUserData.email.toString());
    // console.log(this.loginUserData);
    this._auth.loginUser(this.loginUserData)
    .subscribe (res=>{
      
      // console.log(res);
      localStorage.setItem('token', res.token);
      this.router.navigate(['dashboard']);
      },
      err=>{
        this.errors=err.error.message;
        console.log(this.errors);
      }
    )
    // .subscribe ((data:any)=>{
      
    //   console.log(data);
    //   localStorage.setItem('token', data.token);
    //   this.router.navigate(['dashboard']);
    //   }
    // )
    
    
  }


}
