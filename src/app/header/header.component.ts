import { Component, OnInit } from '@angular/core';
import { UsersService } from '../lessonServices/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public loginName: string = "Вход"
  constructor(private userService: UsersService) {
  }

  ngOnInit(): void {

  }
  public isHasAuth() {
    return this.userService.hasUserAuth;
  } 
  public logout() {
    this.userService.unsubscribe();
  }   
}
