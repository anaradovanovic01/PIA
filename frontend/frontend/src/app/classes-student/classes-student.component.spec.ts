import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesStudentComponent } from './classes-student.component';

describe('ClassesStudentComponent', () => {
  let component: ClassesStudentComponent;
  let fixture: ComponentFixture<ClassesStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassesStudentComponent]
    });
    fixture = TestBed.createComponent(ClassesStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
