import { Component, Input } from '@angular/core';
import { PostModel } from '../post-model';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-vote-button',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './vote-button.component.html',
  styleUrl: './vote-button.component.css'
})
export class VoteButtonComponent {
  @Input() post!: PostModel;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;


  upvotePost() {}

  downvotePost() {}
}
