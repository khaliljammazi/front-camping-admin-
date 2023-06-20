import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCampingCenterComponent } from './add-camping-center.component';

describe('AddCampingCenterComponent', () => {
  let component: AddCampingCenterComponent;
  let fixture: ComponentFixture<AddCampingCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCampingCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCampingCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
