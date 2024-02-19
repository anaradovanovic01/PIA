import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistationRequestsComponent } from './registation-requests.component';

describe('RegistationRequestsComponent', () => {
  let component: RegistationRequestsComponent;
  let fixture: ComponentFixture<RegistationRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistationRequestsComponent]
    });
    fixture = TestBed.createComponent(RegistationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
