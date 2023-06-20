import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampingCenterComponent } from './camping-center.component';

describe('CampingCenterComponent', () => {
  let component: CampingCenterComponent;
  let fixture: ComponentFixture<CampingCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampingCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampingCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
