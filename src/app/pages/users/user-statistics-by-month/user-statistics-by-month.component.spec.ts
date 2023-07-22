import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStatisticsByMonthComponent } from './user-statistics-by-month.component';

describe('UserStatisticsByMonthComponent', () => {
  let component: UserStatisticsByMonthComponent;
  let fixture: ComponentFixture<UserStatisticsByMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserStatisticsByMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStatisticsByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
