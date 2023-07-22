import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStatisticsBySeasonComponent } from './user-statistics-by-season.component';

describe('UserStatisticsBySeasonComponent', () => {
  let component: UserStatisticsBySeasonComponent;
  let fixture: ComponentFixture<UserStatisticsBySeasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserStatisticsBySeasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStatisticsBySeasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
