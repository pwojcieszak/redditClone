import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { CreatePostPayload } from './create-post.payload';
import { SubredditModel } from '../../subreddit/subreddit-response';
import { SubredditService } from '../../subreddit/subreddit.service';
import { PostService } from '../../shared/post.service';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { error } from 'console';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    EditorComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})

export class CreatePostComponent implements OnInit {

  createPostForm!: FormGroup;
  postPayload!: CreatePostPayload;
  subreddits?: Array<SubredditModel>;

  constructor(private router: Router, private postService: PostService,
    private subredditService: SubredditService) {
    this.postPayload = {
      postName: '',
      url: '',
      description: '',
      subredditName: ''
    }
  }

  ngOnInit() {
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      subredditName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
    this.subredditService.getAllSubreddits().subscribe({
      next: (data) => {
        this.subreddits = data;
      },
      error: (error: any) => {
        throwError(() => error);
      }
    });
  }

  createPost() {
    this.postPayload.postName = this.createPostForm.get('postName')?.value;
    this.postPayload.subredditName = this.createPostForm.get('subredditName')?.value;
    this.postPayload.url = this.createPostForm.get('url')?.value;
    this.postPayload.description = this.createPostForm.get('description')?.value;

    this.postService.createPost(this.postPayload).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: (error: any) => {
        throwError(() => error);
      }
    });
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }

}
