import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { UserType } from '../users';

@Injectable({
  providedIn: 'root'
})
export class 
UsersService {
  private userSubject: BehaviorSubject<UserType> = new BehaviorSubject<UserType>(new UserType());
  public hasUserAuth: boolean = false;
  public currentUser = new UserType();
  constructor(private httpClient: HttpClient) { }

  public getUserData(userName: string, password: string): Observable<UserType> {
    let params = {
      params: new HttpParams().set('loginName', userName).set('pass', password)
    }
    this.httpClient.get('https://localhost:5001/User/GetUserData', params)
    .subscribe({
      next: (user) => { 
        if (user == null) {
          this.hasUserAuth = false;
        }
        else {
          this.currentUser = user as UserType;
          this.hasUserAuth = true;
          this.userSubject.next(this.currentUser);
        }           
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
      complete: () => { console.log("Установлен пользователь"); }      
    }); 
    return this.userSubject.asObservable(); 
  }

  public saveChanges(changedUser: UserType) {
    let params = {
      params: new HttpParams().set('loginName', changedUser.login)
        .set('firstName', changedUser.firstName)
        .set('surName', changedUser.surName)
    }
    this.httpClient.get('https://localhost:5001/User/SaveDataUser', params)
      .subscribe({
        next: (value) => { 
          if (value) {
            this.currentUser.login = changedUser.login;
            this.currentUser.firstName = changedUser.firstName;
            this.currentUser.surName = changedUser.surName;
            alert('Правки успешно внесены');
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
        },
        complete: () => { console.log("Сохранен пользователь"); }      
      });
  }

  public unsubscribe() {
    this.hasUserAuth = false;
  }  
}
