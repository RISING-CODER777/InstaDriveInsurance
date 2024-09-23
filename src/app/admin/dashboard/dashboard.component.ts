import { Component, Input } from '@angular/core';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5EE1E6', '#D981F9', '#5596E6', '#FF7096']
  };
  @Input() view: any;
  @Input() legendPosition =LegendPosition.Below;
  @Input() legendPositionR =LegendPosition.Right;

  lineChartData = [
    {
      "name": "Policies Issued",
      "series": [
        {
          "name": "Jan",
          "value": 10000
        },
        {
          "name": "Feb",
          "value": 15000
        },
        {
          "name": "Mar",
          "value": 25000
        },
        {
          "name": "Apr",
          "value": 20000
        },
        {
          "name": "May",
          "value": 35000
        },
        {
          "name": "Jun",
          "value": 24000
        },
        {
          "name": "Jul",
          "value": 23000
        },
        {
          "name": "Aug",
          "value": 30000
        },
        {
          "name": "Sept",
          "value": 20000
        },
        {
          "name": "Oct",
          "value": 15000
        },
        {
          "name": "Nov",
          "value": 10000
        },
        {
          "name": "Dec",
          "value": 25000
        },
      ]
    }
  ];

  vehicleSources = [
    {
      "name": "Truck",
      "value": 60
    },
    {
      "name": "Car",
      "value": 20
    },
    {
      "name": "Bike",
      "value": 20
    }
  ];

  proposalStatus = [
    {
      "name": "Approved",
      "value": 60
    },
    {
      "name": "Rejected",
      "value": 20
    },
    {
      "name": "Under Review",
      "value": 20
    }
  ];
}
