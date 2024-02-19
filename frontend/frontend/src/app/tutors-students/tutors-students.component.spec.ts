import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorsStudentsComponent } from './tutors-students.component';

describe('TutorsStudentsComponent', () => {
  let component: TutorsStudentsComponent;
  let fixture: ComponentFixture<TutorsStudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TutorsStudentsComponent]
    });
    fixture = TestBed.createComponent(TutorsStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
