import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit{
  constructor(private router: Router) {
  }
  ngOnInit(): void {
  }

  goToCreatePost() {
    this.router.navigateByUrl('/create-post');
  }
  goToCreateSubreddit() {
    this.router.navigateByUrl('/create-subreddit');
  }
}
