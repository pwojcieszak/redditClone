import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { PostModel } from '../post-model';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VoteButtonComponent } from '../vote-button/vote-button.component';

@Component({
  selector: 'app-post-tile',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterLink,
    CommonModule,
    VoteButtonComponent
  ],
  templateUrl: './post-tile.component.html',
  styleUrl: './post-tile.component.css'
})
export class PostTileComponent implements OnInit{
  faComments = faComments;
  @Input() posts!: PostModel[];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);
  }
}
