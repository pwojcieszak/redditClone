import { Component, OnInit } from '@angular/core';
import { PostService } from '../../shared/post.service';
import { ActivatedRoute } from '@angular/router';
import { SubredditService } from '../subreddit.service';
import { SubredditModel } from '../subreddit-response';
import { PostModel } from '../../shared/post-model';
import { PostTileComponent } from '../../shared/post-tile/post-tile.component';
import { SideBarComponent } from '../../shared/side-bar/side-bar.component';
import { SubredditSideBarComponent } from '../../shared/subreddit-side-bar/subreddit-side-bar.component';
import { throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-subreddit',
  standalone: true,
  imports: [
    PostTileComponent, 
    SideBarComponent, 
    SubredditSideBarComponent,
    CommonModule
  ],
  templateUrl: './view-subreddit.component.html',
  styleUrl: './view-subreddit.component.css'
})
export class ViewSubredditComponent implements OnInit{
  subredditId: number;
  subreddit!: SubredditModel;
  posts!: PostModel[];

  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
              private subredditService: SubredditService) {
    this.subredditId = this.activateRoute.snapshot.params['id'];
  }
  
  ngOnInit(): void {
    this.getSubredditById();
    this.getPostsForSubreddit();
  }

  getSubredditById() {
    this.subredditService.getSubreddit(this.subredditId).subscribe({
      next: (data) => this.subreddit = data,
      error: (error: any) => throwError(() => error)
    });
  }

  getPostsForSubreddit() {
    this.postService.getAllPostsForSubreddit(this.subredditId).subscribe({
      next: (data) => this.posts = data,
      error: (error: any) => throwError(() => error)
    });
  }

}
