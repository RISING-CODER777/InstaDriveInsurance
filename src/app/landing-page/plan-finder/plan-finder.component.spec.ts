import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanFinderComponent } from './plan-finder.component';

describe('PlanFinderComponent', () => {
  let component: PlanFinderComponent;
  let fixture: ComponentFixture<PlanFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanFinderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
