import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleSelectionComponent } from './vehicle-selection.component';

describe('VehicleSelectionComponent', () => {
  let component: VehicleSelectionComponent;
  let fixture: ComponentFixture<VehicleSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
