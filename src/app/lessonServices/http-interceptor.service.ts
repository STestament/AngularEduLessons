import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private userService: UsersService) { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let params = new HttpHeaders();
    if (this.userService.hasUserAuth) {
      let currentUser = this.userService.currentUser;
      params = new HttpHeaders().set('AuthorizationData', currentUser.login);
    }
    let requestResult = request.clone({
      headers: params
    });
    return next.handle(requestResult);
  }

}
