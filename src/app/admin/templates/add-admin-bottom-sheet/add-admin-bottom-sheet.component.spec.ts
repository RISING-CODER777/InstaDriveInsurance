import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminBottomSheetComponent } from './add-admin-bottom-sheet.component';

describe('AddAdminBottomSheetComponent', () => {
  let component: AddAdminBottomSheetComponent;
  let fixture: ComponentFixture<AddAdminBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAdminBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
