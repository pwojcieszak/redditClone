import { Component, OnInit } from '@angular/core';
import { SideBarComponent } from '../../shared/side-bar/side-bar.component';
import { SubredditSideBarComponent } from '../../shared/subreddit-side-bar/subreddit-side-bar.component';
import { VoteButtonComponent } from '../../shared/vote-button/vote-button.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostModel } from '../../shared/post-model';
import { PostService } from '../../shared/post.service';
import { throwError } from 'rxjs';
import { CommentPayload } from '../../comment/comment.payload';
import { CommentService } from '../../comment/comment.service';

@Component({
  selector: 'app-view-post',
  standalone: true,
  imports: [
    SideBarComponent,
    SubredditSideBarComponent,
    VoteButtonComponent,
    CommonModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.css'
})
export class ViewPostComponent implements OnInit{
  postId: number;
  post!: PostModel;
  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments?: CommentPayload[];

  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
    private commentService: CommentService, private router: Router) {
    this.postId = this.activateRoute.snapshot.params['id'];

    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });
    this.commentPayload = {
      text: '',
      postId: this.postId
    };
  }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsForPost();
  }

  postComment() {
    this.commentPayload.text = this.commentForm.get('text')?.value;
    this.commentService.postComment(this.commentPayload).subscribe({
      next: () => {
        this.commentForm.get('text')?.setValue('');
        this.getCommentsForPost();
      },
      error: (error: any) => throwError(() => error)
    });
  }

  private getPostById() {
    this.postService.getPost(this.postId).subscribe({
      next: (data) => this.post = data,
      error: (error: any) => throwError(() => error)
    });
  }

  private getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe({
      next: (data) => this.comments = data,
      error: (error: any) => throwError(() => error)
    });
  }
}
