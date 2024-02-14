import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignupRequestPayload } from './signup-request.payload';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../shared/auth.service';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent implements OnInit{
  signupRequestPayload: SignupRequestPayload;
  signupForm!: FormGroup;

  constructor(private authService: AuthService) {
    this.signupRequestPayload = {
      username: '',
      email: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this. signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    })
  }

  signup() {
    if (this.signupForm.valid) {
      this.signupRequestPayload.email = this.signupForm.get('email')!.value;
      this.signupRequestPayload.username = this.signupForm.get('username')!.value;
      this.signupRequestPayload.password = this.signupForm.get('password')!.value;

      this.authService.signup(this.signupRequestPayload)
        .pipe(
          tap(data => {
            console.log(data)
          })
        )
        .subscribe();
    }
  }
}