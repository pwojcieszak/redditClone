import { Component, OnInit } from '@angular/core';
import { PostModel } from '../shared/post-model';
import { PostService } from '../shared/post.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PostTileComponent } from '../shared/post-tile/post-tile.component';
import { SubredditSideBarComponent } from '../shared/subreddit-side-bar/subreddit-side-bar.component';
import { SideBarComponent } from '../shared/side-bar/side-bar.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    PostTileComponent,
    SubredditSideBarComponent,
    SideBarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  posts: Array<PostModel> = [];

  constructor(private postService: PostService) {
    this.postService.getAllPosts().subscribe(post => {
      this.posts = post;
    })
  }

  ngOnInit(): void {
  }

}
