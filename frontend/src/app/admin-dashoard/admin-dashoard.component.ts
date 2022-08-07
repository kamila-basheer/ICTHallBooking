import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-admin-dashoard',
  templateUrl: './admin-dashoard.component.html',
  styleUrls: ['./admin-dashoard.component.css']
})
export class AdminDashoardComponent implements OnInit {
  opened =  true;

  constructor(public authService:AuthService) { }

  ngOnInit(): void {
  }
  toggleSidebar(){
    this.opened =!this.opened;
  }

}
