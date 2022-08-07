import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  errors=null
  loginAdminData = {username:'',
  password:'',
  
  };
  constructor(private _auth:AuthService, public router:Router) { }

  ngOnInit(): void {
  }

  loginAdmin(){
    localStorage.setItem("username", this.loginAdminData.username.toString());
    
    this._auth.loginAdmin(this.loginAdminData)
    .subscribe (res=>{
      
      console.log(res);
      localStorage.setItem('token', res.token);
      this.router.navigate(['admin-dashboard']);
      },
      err=>{
        this.errors=err.error.message;
        console.log(this.errors);
      }
    )

    
  }

}
