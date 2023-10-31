import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCalculatorValidationComponent } from './credit-calculator-validation.component';

describe('CreditCalculatorValidationComponent', () => {
  let component: CreditCalculatorValidationComponent;
  let fixture: ComponentFixture<CreditCalculatorValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditCalculatorValidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditCalculatorValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
