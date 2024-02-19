import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityQuestionComponent } from './security-question.component';

describe('SecurityQuestionComponent', () => {
  let component: SecurityQuestionComponent;
  let fixture: ComponentFixture<SecurityQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecurityQuestionComponent]
    });
    fixture = TestBed.createComponent(SecurityQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
