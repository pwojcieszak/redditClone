import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SubredditModel} from "../subreddit-response";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {SubredditService} from "../subreddit.service";

@Component({
  selector: 'app-create-subreddit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-subreddit.component.html',
  styleUrl: './create-subreddit.component.css'
})
export class CreateSubredditComponent {
  createSubredditForm: FormGroup;
  subredditModel: SubredditModel;
  title = new FormControl('');
  description = new FormControl('');

  constructor(private router: Router, private subredditService: SubredditService) {
    this.createSubredditForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    this.subredditModel = {
      name: '',
      description: ''
    }
  }

  ngOnInit() {
  }

  discard() {
    this.router.navigateByUrl('/');
  }

  createSubreddit() {
    this.subredditModel.name = this.createSubredditForm.get('title')?.value;
    this.subredditModel.description = this.createSubredditForm.get('description')?.value;
    this.subredditService.createSubreddit(this.subredditModel).subscribe({
      next: () => {
        this.router.navigateByUrl('/list-subreddits');
      },
      error: (err: HttpErrorResponse) => {
        console.log('Error occurred', err);
      }
    });
  }
}
