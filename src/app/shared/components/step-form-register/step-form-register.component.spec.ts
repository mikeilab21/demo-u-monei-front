import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepFormRegisterComponent } from './step-form-register.component';

describe('StepFormRegisterComponent', () => {
  let component: StepFormRegisterComponent;
  let fixture: ComponentFixture<StepFormRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepFormRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepFormRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
