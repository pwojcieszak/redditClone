import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignupRequestPayload } from './signup-request.payload';
import { AuthService } from '../shared/auth.service';
import { tap } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent implements OnInit{
  signupRequestPayload: SignupRequestPayload;
  signupForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router,
    private toastr: ToastrService) {
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
          tap({
            next: () => {
              this.router.navigate(['/login'],
              { queryParams: { registered: 'true'} }
          )},
            error: (error) => {
              this.toastr.error('Registration failed! Please try again');
            }
          })
        )
        .subscribe();
    }
  }
}
