import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampingCenterFeedbackComponent } from './camping-center-feedback.component';


describe('CampingCenterFeedbackComponent', () => {
  let component: CampingCenterFeedbackComponent;
  let fixture: ComponentFixture<CampingCenterFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampingCenterFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampingCenterFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
