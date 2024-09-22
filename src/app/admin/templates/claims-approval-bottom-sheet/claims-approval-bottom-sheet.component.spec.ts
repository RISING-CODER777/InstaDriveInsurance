import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsApprovalBottomSheetComponent } from './claims-approval-bottom-sheet.component';

describe('ClaimsApprovalBottomSheetComponent', () => {
  let component: ClaimsApprovalBottomSheetComponent;
  let fixture: ComponentFixture<ClaimsApprovalBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimsApprovalBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimsApprovalBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
