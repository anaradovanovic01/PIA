import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesTutorComponent } from './classes-tutor.component';

describe('ClassesTutorComponent', () => {
  let component: ClassesTutorComponent;
  let fixture: ComponentFixture<ClassesTutorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassesTutorComponent]
    });
    fixture = TestBed.createComponent(ClassesTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
