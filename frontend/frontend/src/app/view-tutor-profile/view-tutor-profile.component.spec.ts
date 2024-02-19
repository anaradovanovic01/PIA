import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTutorProfileComponent } from './view-tutor-profile.component';

describe('ViewTutorProfileComponent', () => {
  let component: ViewTutorProfileComponent;
  let fixture: ComponentFixture<ViewTutorProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTutorProfileComponent]
    });
    fixture = TestBed.createComponent(ViewTutorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
