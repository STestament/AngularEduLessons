import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { citizen, king, UserType } from '../users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userSubject: BehaviorSubject<UserType>;
  constructor(private httpClient: HttpClient) {
    this.userSubject = new BehaviorSubject<UserType>(king);
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var requestResult = request.clone({
      headers: new HttpHeaders().set('authorization', 'user-password')
    });
    return next.handle(requestResult);
  }

  public getUser(userType: boolean): Observable<UserType>{
    //if(!this.userSubject){
      //this.userSubject = new BehaviorSubject<UserType>(king);
      this.httpClient.post('https://localhost:5001/User/GetUser', userType).pipe()
      .subscribe({
        next: (user) => { 
          let newUser = user as UserType;
          this.userSubject.next(newUser); 
        },
        error: (error: HttpErrorResponse) => console.log(error.message),
        //complete: () => { console.log("get user complete"); }      
      });
    //}
    return this.userSubject.asObservable();   
  }  
}
