import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityFeedbackComponent } from './activity-feedback.component';

describe('ActivityFeedbackComponent', () => {
  let component: ActivityFeedbackComponent;
  let fixture: ComponentFixture<ActivityFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
