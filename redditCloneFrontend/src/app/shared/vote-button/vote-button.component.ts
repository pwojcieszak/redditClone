import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from '../post-model';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VotePayload } from './vote-payload';
import { VoteService } from '../vote.service';
import { AuthService } from '../../auth/shared/auth.service';
import { PostService } from '../post.service';
import { ToastrService } from 'ngx-toastr';
import { VoteType } from './vote-type';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-vote-button',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './vote-button.component.html',
  styleUrl: './vote-button.component.css'
})
export class VoteButtonComponent implements OnInit{
  @Input() post!: PostModel;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  votePayload: VotePayload;
  isLoggedIn!: boolean;

  constructor(private voteService: VoteService,
    private authService: AuthService,
    private postService: PostService, 
    private toastr: ToastrService) {

    this.votePayload = {
      voteType: undefined,
      postId: undefined
    }
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
  }

  ngOnInit(): void {
    this.updateVoteDetails();
  }

  upvotePost() {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
  }

  downvotePost() {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
  }

  private vote() {
    this.votePayload.postId = this.post.id;
    this.voteService.vote(this.votePayload).subscribe({
      next: () => {
        this.updateVoteDetails();
      },
      error: (error) => {
        this.toastr.error(error.message);
        throwError(() => error);
      }
    });
  }

  private updateVoteDetails() {
    this.postService.getPost(this.post.id).subscribe(post => {
      this.post = post;
    });
  }
}
