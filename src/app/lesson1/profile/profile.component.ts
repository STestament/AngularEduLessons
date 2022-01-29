import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/lessonServices/users.service';
import { UserType } from 'src/app/users';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loginForm!: FormGroup;  
  isUserNotExists = false;
  changedUser: UserType;
  currentUser?: UserType;

  constructor(private fb: FormBuilder, private userService: UsersService) { 
    this.currentUser = this.userService.currentUser;
    this.changedUser = this.userService.currentUser;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login: [this.userService.currentUser.login, Validators.required],
      firstName: [this.userService.currentUser.firstName, Validators.required],
      surName: [this.userService.currentUser.surName, Validators.required]
    });
  }

  submit(): void {    
    this.changedUser = this.loginForm.value;
    this.userService.saveChanges(this.changedUser);
  }
  cancel(): void {    
    this.loginForm.patchValue({ 
      login: this.currentUser?.login, 
      firstName: this.currentUser?.firstName, 
      surName: this.currentUser?.surName });
  }
}
