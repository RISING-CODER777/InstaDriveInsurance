import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NewApproval } from '../models/new-approval.model';
import { AdminService } from '../services/admin.service';

import {MatBottomSheet} from '@angular/material/bottom-sheet';
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

  
  // Columns to be displayed in the table
  displayedColumns: string[] = ['index', 'user', 'policyDetails', 'status', 'requestDate', 'premiumAmount', 'adminComments'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private adminService: AdminService,
    private matBottomSheet: MatBottomSheet
  ) {
    this.adminService.getNewApproval().subscribe((data: NewApproval[]) => {
      this.newApproval = data;
      this.dataSource.data = this.newApproval;
    });

 
   
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  selectHandler(row: NewApproval) {
    this.selection = row;
    this.matBottomSheet.open(
      NewApprovalBottomSheetComponent,
      {
        data: this.selection,
        backdropClass: 'bottom-sheet-backdrop-blur',
        panelClass: 'bottom-sheet-container',
      }
    )
  }


}
