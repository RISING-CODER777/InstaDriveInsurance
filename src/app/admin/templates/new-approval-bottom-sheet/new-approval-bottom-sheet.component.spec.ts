import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewApprovalBottomSheetComponent } from './new-approval-bottom-sheet.component';

describe('NewApprovalBottomSheetComponent', () => {
  let component: NewApprovalBottomSheetComponent;
  let fixture: ComponentFixture<NewApprovalBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewApprovalBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewApprovalBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
