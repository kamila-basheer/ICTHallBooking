import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  errors=null
  // passPtn='(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'
  registerUserData = {username:'',
  email:'',
  password:'',
  confirmPassword:''
  };


  constructor(private _auth:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  registerUser(){

    this._auth.registerUser(this.registerUserData)
    .subscribe ((data:any)=>{
      // console.log(data);
   
      // localStorage.setItem('token', data.token);
      this.router.navigate(['login']);
    },err=>{
      this.errors=err.error.message;
      console.log(this.errors);
    })
      
  }

}
