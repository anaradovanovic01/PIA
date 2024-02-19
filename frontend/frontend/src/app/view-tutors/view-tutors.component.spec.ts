import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTutorsComponent } from './view-tutors.component';

describe('ViewTutorsComponent', () => {
  let component: ViewTutorsComponent;
  let fixture: ComponentFixture<ViewTutorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTutorsComponent]
    });
    fixture = TestBed.createComponent(ViewTutorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
