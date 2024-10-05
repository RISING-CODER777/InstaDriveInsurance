import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Admin } from 'src/app/admin/models/admin-model';
import { AdminService } from '../../services/admin.service'

@Component({
  selector: 'app-edit-admin-dialog',
  templateUrl: './edit-admin-dialog.component.html',
  styleUrls: ['./edit-admin-dialog.component.scss']
})
export class EditAdminDialogComponent implements OnInit {

  adminFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditAdminDialogComponent>,
    private adminService: AdminService,
    @Inject(MAT_DIALOG_DATA) private data: Admin
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.populateForm();
  }

  initForm() {
    this.adminFormGroup = this.fb.group({
      username: ['', Validators.required],
      fullName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      aadharNumber: [{ value: '', disabled: true }, Validators.required],
      panNumber: [{ value: '', disabled: true }, Validators.required],
      role:[{ value: '', disabled: true }, Validators.required],
      passwordHash: [{ value: '', disabled: true }, Validators.required] // Keep this empty for security
    });
  }

  populateForm() {
    if (this.data) {
      this.adminFormGroup.patchValue({
        username: this.data.username,
        fullName: this.data.fullName,
        dateOfBirth: this.data.dateOfBirth ? this.formatDate(this.data.dateOfBirth) : '',
        email: this.data.email,
        phoneNumber: this.data.phoneNumber,
        address: this.data.address,
        aadharNumber: this.data.aadharNumber,
        panNumber: this.data.panNumber,
        role: this.data.role ,
        passwordHash: this.data.passwordHash // Do not pre-fill the password
      });
    }
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  isFormInvalid(): boolean {
    return this.adminFormGroup.invalid;
  }

  onSubmit() {
    if (!this.isFormInvalid()) {
      const updatePayload = {
        userID: this.data.userID,
        username: this.adminFormGroup.value.username,
        fullName: this.adminFormGroup.value.fullName,
        email: this.adminFormGroup.value.email,
        phoneNumber: this.adminFormGroup.value.phoneNumber,
        address: this.adminFormGroup.value.address,
        aadharNumber: this.data.aadharNumber, // Required
        panNumber: this.data.panNumber, // Required
        role: this.data.role, // Use the value from the form
        dateOfBirth: this.adminFormGroup.value.dateOfBirth,
        passwordHash :this.data.passwordHash
    };

      console.log('Admin Data to be submitted:', updatePayload); // Debugging line

      this.adminService.updateAdmin(this.data.userID!, updatePayload).subscribe({
        next: (response) => {
          console.log('Updating Admin:', response);
          this.dialogRef.close(updatePayload);
        },
        error: (error) => {
          console.error('Error updating admin:', error);
        },
        complete: () => {
          console.log('Update complete');
        }
      });
    }
  }


}
