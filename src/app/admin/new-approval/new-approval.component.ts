import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NewApproval } from '../models/new-approval.model';
import { AdminService } from '../services/admin.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { NewApprovalBottomSheetComponent } from '../templates/new-approval-bottom-sheet/new-approval-bottom-sheet.component';

@Component({
  selector: 'app-new-approval',
  templateUrl: './new-approval.component.html',
  styleUrls: ['./new-approval.component.scss']
})
export class NewApprovalComponent implements AfterViewInit {
  newApproval: NewApproval[] = [];
  dataSource = new MatTableDataSource<NewApproval>();
  selection!: NewApproval;

  // New properties for filters
  filterDate: Date | null = null; // For filtering by date
  filterStatus: string = ''; // For filtering by status

  displayedColumns: string[] = ['index', 'user', 'policyDetails', 'status', 'requestDate', 'premiumAmount', 'adminComments'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private adminService: AdminService,
    private matBottomSheet: MatBottomSheet
  ) {
    // Fetching new approvals from the service
    this.adminService.getNewApproval().subscribe((data: NewApproval[]) => {
      this.newApproval = data.map(item => ({
        ...item,
        requestDate: item.requestDate ? new Date(item.requestDate) : null // Convert requestDate to Date or null
      }));
      this.dataSource.data = this.newApproval;
      console.log(data);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Apply filters based on date and status
  applyFilters() {
    this.dataSource.data = this.newApproval.filter(item => {
      const requestDate = item.requestDate ? new Date(item.requestDate) : null; // Create a Date or null
      const dateMatch = this.filterDate && requestDate ? requestDate.toDateString() === this.filterDate.toDateString() : true; // Check if both dates are valid
      const statusMatch = this.filterStatus ? item.status === this.filterStatus : true; // Check if status matches
      return dateMatch && statusMatch; // Return if both match
    });
  }

  selectHandler(row: NewApproval) {
    this.selection = row; // Set the selected row
    this.matBottomSheet.open(
      NewApprovalBottomSheetComponent,
      {
        data: this.selection,
        backdropClass: 'bottom-sheet-backdrop-blur',
        panelClass: 'bottom-sheet-container',
      }
    );
  }
}
