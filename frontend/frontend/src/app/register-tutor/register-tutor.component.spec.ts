import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTutorComponent } from './register-tutor.component';

describe('RegisterTutorComponent', () => {
  let component: RegisterTutorComponent;
  let fixture: ComponentFixture<RegisterTutorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterTutorComponent]
    });
    fixture = TestBed.createComponent(RegisterTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
