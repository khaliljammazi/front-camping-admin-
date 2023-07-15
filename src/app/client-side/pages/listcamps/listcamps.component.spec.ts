import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcampsComponent } from './listcamps.component';

describe('ListcampsComponent', () => {
  let component: ListcampsComponent;
  let fixture: ComponentFixture<ListcampsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListcampsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcampsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
