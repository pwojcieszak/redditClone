import {Component, OnInit} from '@angular/core';
import {SubredditModel} from "../subreddit-response";
import {SubredditService} from "../subreddit.service";
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";
import {RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-list-subreddits',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './list-subreddits.component.html',
  styleUrl: './list-subreddits.component.css'
})
export class ListSubredditsComponent implements OnInit{
  subreddits!: Array<SubredditModel>;
  constructor(private subredditService: SubredditService) { }

  ngOnInit() {
    this.subredditService.getAllSubreddits().subscribe({
      next: (data) => {
        this.subreddits = data;
      },
      error: (error: HttpErrorResponse) => {
        throwError(() => error);
      }
    });
  }

}
