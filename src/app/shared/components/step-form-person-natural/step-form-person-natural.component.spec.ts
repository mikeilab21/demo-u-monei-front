import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepFormPersonNaturalComponent } from './step-form-person-natural.component';

describe('StepFormPersonNaturalComponent', () => {
  let component: StepFormPersonNaturalComponent;
  let fixture: ComponentFixture<StepFormPersonNaturalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepFormPersonNaturalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepFormPersonNaturalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
