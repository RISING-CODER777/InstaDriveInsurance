import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Claim } from '../models/claim-approval.model';
import { AdminService } from '../services/admin.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-claims-approval',
  templateUrl: './claims-approval.component.html',
  styleUrls: ['./claims-approval.component.scss']
})
export class ClaimsApprovalComponent implements AfterViewInit {
  
  claims: Claim[] = [];
  dataSource = new MatTableDataSource<Claim>();
  selectedClaim!: Claim;

  displayedColumns: string[] = [
    'index',
    'claimNumber',
    'user',
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
      this.claims = data;
      this.dataSource.data = this.claims;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
