import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Claim } from '../models/claim-approval.model';
import { AdminService } from '../services/admin.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ClaimsApprovalBottomSheetComponent } from '../templates/claims-approval-bottom-sheet/claims-approval-bottom-sheet.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-claims-approval',
  templateUrl: './claims-approval.component.html',
  styleUrls: ['./claims-approval.component.scss'],
})
export class ClaimsApprovalComponent implements AfterViewInit {
  claims: Claim[] = [];
  dataSource = new MatTableDataSource<Claim>();
  selectedClaim!: Claim;
  filterDate: Date | null = null;
  filterStatus: string = '';
  subscription!: Subscription;

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
  ) {}

  ngOnInit() {
    // Subscribe to the claims observable from the BehaviorSubject
    this.subscription = this.adminService.getClaimsObservable().subscribe((data: Claim[]) => {
      this.claims = data.map(item => ({
        ...item,
        dateOfIncident: item.dateOfIncident ? new Date(item.dateOfIncident) : null, // Ensure dateOfIncident is a Date object
      }));
      this.dataSource.data = this.claims;
    });

    // Trigger fetching claims from the server
    this.adminService.getClaims();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  // Custom filter to combine date and status filtering
  customFilterPredicate() {
    return (data: Claim, filter: string): boolean => {
      const matchStatus = this.filterStatus ? data.status === this.filterStatus : true;
      const matchDate = this.filterDate
        ? new Date(data.dateOfIncident || '').toLocaleDateString() === this.filterDate?.toLocaleDateString()
        : true;

      return matchStatus && matchDate;
    };
  }

  // Apply both filters (date and status)
  applyFilter() {
    this.dataSource.filter = '' + Math.random(); // Trigger filter update
  }

  selectHandler(row: Claim) {
    this.selectedClaim = row;
    this.matBottomSheet.open(ClaimsApprovalBottomSheetComponent, {
      data: this.selectedClaim,
      backdropClass: 'bottom-sheet-backdrop-blur',
      panelClass: 'bottom-sheet-container',
    });
  }

  // Unsubscribe to avoid memory leaks
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
