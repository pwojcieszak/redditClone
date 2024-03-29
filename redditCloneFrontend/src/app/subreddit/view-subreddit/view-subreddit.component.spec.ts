import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubredditComponent } from './view-subreddit.component';

describe('ViewSubredditComponent', () => {
  let component: ViewSubredditComponent;
  let fixture: ComponentFixture<ViewSubredditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSubredditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewSubredditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
