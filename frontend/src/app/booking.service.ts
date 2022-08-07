import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http:HttpClient) { }

  checkslot(data:any)
  {
return this.http.post("http://localhost:3000/checkslot",{item:data});
  }

  bookslot(data:any)
  {
    return this.http.post("http://localhost:3000/book-hall",{item:data});
  }

  getbookingdetails(user:any)
  {
 return this.http.post("http://localhost:3000/getbookingdetail",{item:user});
  }

  getbookingdata(user:any)
  {
 return this.http.get("http://localhost:3000/getbookingdetail"); //chnged get booking details
  }

  getbookingsdata()
  {
 return this.http.get("http://localhost:3000/getbookingdetails");
  }

  deletebooking(item:any)
  {
   return this.http.post("http://localhost:3000/deletebooking",{"id":item});
  }

  delbooking(item:any)
  {
   return this.http.post("http://localhost:3000/delbooking",{"id":item});
  }

  currentbooking(user:any)
  {
    return this.http.get("http://localhost:3000/currentbookings");
  }

  getbookingitem(id:any)
  {
    return this.http.get("http://localhost:3000/getbookingitem/"+id);
  }


  admcheckslot(data:any)
  {
return this.http.post<any>("http://localhost:3000/admcheckslot",{item:data});
  }

  admupdatebooking(data:any)
  {
    return this.http.post<any>("http://localhost:3000/admbooking",{item:data});
  }

}
