import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedApplicationComponent } from './completed-application.component';

describe('CompletedApplicationComponent', () => {
  let component: CompletedApplicationComponent;
  let fixture: ComponentFixture<CompletedApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
