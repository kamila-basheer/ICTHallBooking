import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edit-associate',
  templateUrl: './edit-associate.component.html',
  styleUrls: ['./edit-associate.component.css']
})
export class EditAssociateComponent implements OnInit {

  title:String="Edit Associate";
  Associate={
    
    username :'',
    email :'',
    password :'',
  
  };

  constructor(private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
    let AssociateId = localStorage.getItem("editAssociateId");
    console.log(AssociateId);
    this.authService.getAssociate(AssociateId).subscribe((data)=>{
      this.Associate=JSON.parse(JSON.stringify(data));
    },err=>{
      console.log(err.error.message);
      if(err.error.message=='Unauthorized'){
      this.router.navigate(['home']);}
      // this.errors=err.error.message;
      // alert(this.errors);
      // this.router.navigate(['home']);

    })
  }

  EditAssociate(){
    this.authService.editAssociate(this.Associate);
    localStorage.removeItem('editAssociateId');
    alert("Success");
    this.router.navigate(['admin-dashboard/manage-associates']);
  }

}
