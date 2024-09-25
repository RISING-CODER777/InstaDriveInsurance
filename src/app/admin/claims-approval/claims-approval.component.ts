import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Claim } from '../models/claim-approval.model';
import { AdminService } from '../services/admin.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ClaimsApprovalBottomSheetComponent } from '../templates/claims-approval-bottom-sheet/claims-approval-bottom-sheet.component';

@Component({
  selector: 'app-claims-approval',
  templateUrl: './claims-approval.component.html',
  styleUrls: ['./claims-approval.component.scss'],
})
export class ClaimsApprovalComponent implements AfterViewInit {
  claims: Claim[] = [];
  dataSource = new MatTableDataSource<Claim>();
  selectedClaim!: Claim;

  displayedColumns: string[] = [
    'index',
    'claimUser',
    'dateOfIncident',
    'claimAmount',
    'approvedAmount',
    'status',
    'description',
    'remarks',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private adminService: AdminService,
    private matBottomSheet: MatBottomSheet
  ) {
    this.adminService.getClaims().subscribe((data: Claim[]) => {
      this.claims = data.map(item => ({
        ...item,
        dateOfIncident: item.dateOfIncident ? new Date(item.dateOfIncident) : null // Ensure dateOfIncident is a Date object
      }));
      this.dataSource.data = this.claims;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  selectHandler(row: Claim) {
    this.selectedClaim = row;
    this.matBottomSheet.open(ClaimsApprovalBottomSheetComponent, {
      data: this.selectedClaim,
      backdropClass: 'bottom-sheet-backdrop-blur',
      panelClass: 'bottom-sheet-container',
    });
  }
}
