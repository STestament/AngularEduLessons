import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/lessonServices/users.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;  
  isUserNotExists = false;

  constructor(private fb: FormBuilder, private router: Router, private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.hasUserAuth = false;
    this.userService.unsubscribe();
    this.loginForm = this.fb.group({
      login: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  submit(): void {    
    this.userService.getUserData(this.loginForm.value.login, this.loginForm.value.password).subscribe({
      next: (data) => {
        if (this.userService.hasUserAuth) {
          this.isUserNotExists = false;
          this.router.navigateByUrl('/edicts?filter=');
        }
        else {
          this.isUserNotExists = true;
        }  
      },
      error: (e) => { console.log(e.message); },
      complete: () => { console.log('Пользователь получен'); } 
    });
  }
}
