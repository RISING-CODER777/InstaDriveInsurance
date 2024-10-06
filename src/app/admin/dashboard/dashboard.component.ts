import { Component, Input, OnInit } from '@angular/core';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { AdminService } from '../services/admin.service';
import { PolicyData } from '../models/policy-issued.model';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  proposalStatus: any[] = [];
  vehicleSources: any[] = [];
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5EE1E6', '#D981F9', '#5596E6', '#FF7096']
  };

  @Input() view: any;
  @Input() legendPosition = LegendPosition.Below;
  @Input() legendPositionR = LegendPosition.Right;

  lineChartData: any[] = [];
  totalPoliciesCount: number = 0;
  totalPremium: number = 0;
  previousPremium: number = 0;
  premiumChangePercentage: number = 0;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchLineChartData();
    this.fetchTotalActivePremium();
    this.fetchVehicleSources();
    this.fetchProposalStatus();
  }

  fetchLineChartData(): void {
    this.adminService.getTotalPoliciesIssued().subscribe((data: PolicyData[]) => {
      console.log(data);
      if (data && data.length > 0) {
        this.lineChartData = [
          {
            name: 'Policies Issued',
            series: data.map(item => ({
              name: item.year.toString(),
              value: item.count
            }))
          }
        ];

        this.totalPoliciesCount = data.reduce((acc, item) => acc + item.count, 0);
      } else {
        console.error('No data available or data structure is incorrect');
      }
    });
  }

  fetchTotalActivePremium(): void {
    this.adminService.getTotalActivePremium().pipe(
      catchError((error) => {
        console.error('Error fetching total active premium:', error);
        return of(0);
      })
    ).subscribe((premium: number) => {
      this.previousPremium = this.totalPremium;
      this.totalPremium = premium;

      // Calculate percentage change
      this.premiumChangePercentage = this.previousPremium > 0 
        ? ((this.totalPremium - this.previousPremium) / this.previousPremium) * 100 
        : 0;
    });
  }

  fetchVehicleSources(): void {
    this.adminService.getVehicleSources().subscribe({
      next: (sources) => {
        this.vehicleSources = sources;
      },
      error: (error) => {
        console.error('Error fetching vehicle sources:', error);
      }
    });
  }

  fetchProposalStatus(): void {
    this.adminService.getProposalStatusCountsObservable().subscribe({
      next: (statusCounts: any[]) => {
        this.proposalStatus = statusCounts;
      },
      error: (error: any) => {
        console.error('Error fetching proposal status:', error);
      }
    });

    // Initial fetch of proposal status
    this.adminService.getProposalStatusCounts(); // Ensure we have data emitted to the BehaviorSubject
  }
}
