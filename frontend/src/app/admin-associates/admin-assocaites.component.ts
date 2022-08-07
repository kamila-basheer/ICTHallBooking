import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AssociateModel } from './associates.model';


@Component({
  selector: 'app-admin-assocaites',
  templateUrl: './admin-assocaites.component.html',
  styleUrls: ['./admin-assocaites.component.css']
})
export class AdminAssocaitesComponent implements OnInit {

  title:String="Associate Details";
  associates:AssociateModel[] = [];
  associatesLength:any
  id:any
  

  constructor(private authService:AuthService, private router: Router) { }

  ngOnInit(): void {

    this.authService.getAssociates()
     .subscribe((data)=>{
      this.associates = JSON.parse(JSON.stringify(data));
      this.associatesLength=this.associates.length;
     },err=>{
      console.log(err.error.message);
      if(err.error.message=='Unauthorized'){
      this.router.navigate(['home']);}
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
   

  deleteAssociate(){

    this.id= localStorage.getItem("Item");
    this.authService.deleteAssociate(this.id)
    .subscribe(res=>{
      console.log("Removed");
    })
    window.location.reload();
    
    // this.authService.deleteAssociate(associate.email)
    //   .subscribe((data)=>{
    //     this.associates=this.associates.filter(a=>a!==associate);
    //     console.log(data);
    //   },err=>{
    //     console.log(err.error.message);
    //     if(err.error.message=='Unauthorized'){
    //     this.router.navigate(['home']);}
        // this.errors=err.error.message;
        // alert(this.errors);
        // this.router.navigate(['home']);
  
      // })
  }

  updateAssociate(associate:any){
    console.log(associate);
    localStorage.setItem("editAssociateId", associate._id.toString());
    this.router.navigate(['admin-dashboard/edit-associate']);
  }
  

}
