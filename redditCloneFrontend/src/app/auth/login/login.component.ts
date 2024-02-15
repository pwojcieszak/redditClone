import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequestPayload } from './login-request.payload';
import { AuthService } from '../shared/auth.service';
import { tap, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  isError: boolean;

  constructor(private authService: AuthService) { 
    this.isError = false;
    this.loginRequestPayload = {
      username: ' ',
      password: ' '
    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  login() {
    if (this.loginForm.valid) {
      this.loginRequestPayload.username = this.loginForm.get('username')!.value;
      this.loginRequestPayload.password = this.loginForm.get('password')!.value;

      this.authService.login(this.loginRequestPayload)
        .pipe(
          tap(data => 
            {console.log("Login successful")}
            )
        )
        .subscribe();
    }
  }
}
