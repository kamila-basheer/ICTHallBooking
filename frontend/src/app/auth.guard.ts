import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,CanLoad, CanActivate, RouterStateSnapshot, UrlTree, Router,Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanLoad {
  constructor(private _auth:AuthService,private router:Router){}
  canActivate():boolean{
    if(this._auth.loggedIn())
    {
      return true;
    }
    else{
      this.router.navigate(['home'])
      return false;
    }

  }
  canLoad(route: Route):boolean{
    const url: string = route.path!;
    console.log('Url:'+ url);
    if(this._auth.loggedIn())
    {
      return true;
    }
    else{
      this.router.navigate(['home'])
      return false;
    }

  }
  
}
