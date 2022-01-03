import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { citizen, king, UserType } from '../users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userSubject!: BehaviorSubject<UserType>;
  public currentUser = new UserType();
  constructor(private httpClient: HttpClient) { }

  public getUser(userName: string): Observable<UserType>{
    if (!this.userSubject) {   
      this.userSubject = new BehaviorSubject<UserType>(this.currentUser); 
      let params = {
        params: new HttpParams().set('loginName', userName)
      }
      //this.httpClient.post('https://localhost:5001/User/GetUser', userName) //
      this.httpClient.get('https://localhost:5001/User/GetUser', params)
      .subscribe({
        next: (user) => { 
          let currentUserData = user != null 
            ? user as UserType
            : new UserType();
          this.currentUser = currentUserData;
          this.userSubject.next(currentUserData); 
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
        },
        complete: () => { console.log("Установлен пользователь"); }      
      });
    }
    return this.userSubject.asObservable();   
  }  
}
