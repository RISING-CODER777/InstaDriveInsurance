import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-add-admin-bottom-sheet',
  templateUrl: './add-admin-bottom-sheet.component.html',
  styleUrls: ['./add-admin-bottom-sheet.component.scss']
})
export class AddAdminBottomSheetComponent {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<AddAdminBottomSheetComponent>,
  ) {}

  close(): void {
    this.bottomSheetRef.dismiss(); // Close the bottom sheet
  }
  

}
