import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth/shared/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgbModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  isLoggedIn!: boolean;
  username?: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((logged) => this.isLoggedIn = logged);
    this.authService.username.subscribe((username) => this.username = username);
  }

  goToUserProfile() {
    this.router.navigateByUrl('/user-profile/' + this.username);
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }
}
