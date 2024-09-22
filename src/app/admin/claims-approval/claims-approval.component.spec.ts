import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsApprovalComponent } from './claims-approval.component';

describe('ClaimsApprovalComponent', () => {
  let component: ClaimsApprovalComponent;
  let fixture: ComponentFixture<ClaimsApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimsApprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimsApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
