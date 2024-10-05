import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddAdminDialogComponent } from '../templates/add-admin-dialog/add-admin-dialog.component';
import { EditAdminDialogComponent } from '../templates/edit-admin-dialog/edit-admin-dialog.component';
import { ConfirmDialogComponent } from '../templates/confirm-dialog/confirm-dialog.component';
import { AddAdminBottomSheetComponent } from '../templates/add-admin-bottom-sheet/add-admin-bottom-sheet.component';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {

  admins: any[] = []; // List of admins
  isLoading: boolean = false; // Loading state

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet
  ) {}

  ngOnInit() {
    this.loadAdmins(); // Load the admins when the component is initialized
  }

  // Load all admins
  private loadAdmins() {
    this.toggleLoading(true); // Start loading state
    this.adminService.getAllAdmins().subscribe({
      next: (res: any[]) => {
        this.admins = res; // Store admins
        this.toggleLoading(false); // Stop loading state
      },
      error: (err) => {
        this.handleError('Error loading admins. Please try again.', err);
      }
    });
  }

  // Open dialog to add a new admin
  openAddAdminDialog(): void {
    const dialogRef = this.dialog.open(AddAdminDialogComponent, {
      width: '600px',
      backdropClass: 'blur-background',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAdmins(); // Reload admins after adding a new one
      }
    });
  }


  // Edit admin
  selectHandler(admin: any) {
    this.openEditAdminDialog(admin); // Reuse the openEditAdminDialog method
  }


  openAdminDetails(admin: any): void {
    this.bottomSheet.open(AddAdminBottomSheetComponent, {
      data: admin,
      disableClose: true
    });
  }

  // Open dialog to edit an existing admin
  private openEditAdminDialog(admin: any) {
    const dialogRef = this.dialog.open(EditAdminDialogComponent, {
      width: '400px',
      data: admin,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update the admin in the list
        const index = this.admins.findIndex(a => a.userID === result.userID);
        if (index !== -1) {
          this.admins[index] = result; // Update the existing admin
        }
      }
    });
  }


  // Delete admin
  deleteAdmin(admin: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: admin
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.toggleLoading(true); // Start loading state
        this.adminService.deleteAdmin(admin.userID).subscribe({
          next: () => {
            this.admins = this.admins.filter(a => a.userID !== admin.userID); // Remove from list
            this.showSnackBar('Admin deleted successfully!', 'success');
            this.toggleLoading(false); // Stop loading state
          },
          error: (err) => {
            this.handleError('Error deleting admin. Please try again.', err);
          }
        });
      }
    });
  }

  // Helper to show snack bar notifications
  private showSnackBar(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
    });
  }

  // Handle loading state
  private toggleLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  // Handle errors
  private handleError(message: string, err: any) {
    console.error(message, err);
    this.toggleLoading(false);
    this.showSnackBar(message, 'error');
  }

}
