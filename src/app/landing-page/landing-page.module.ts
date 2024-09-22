import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle'; // Import for button toggles
import { MatFormFieldModule } from '@angular/material/form-field';       // Import for form fields
import { MatInputModule } from '@angular/material/input';               // Import for input fields
import { FormsModule } from '@angular/forms';                          // Import for ngModel

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { HeroComponent } from './hero/hero.component';
import { VehicleSelectionComponent } from './vehicle-selection/vehicle-selection.component';

import { Truck } from 'angular-feather/icons';
import { FeatherModule } from 'angular-feather';
import { PlanFinderComponent } from './plan-finder/plan-finder.component';

const icons = {
  Truck
};

@NgModule({
  declarations: [
    LandingPageComponent,
    HeroComponent,
    VehicleSelectionComponent,
    PlanFinderComponent
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonToggleModule,  // Added
    MatFormFieldModule,     // Added
    MatInputModule,         // Added
    FormsModule,            // Added
    FeatherModule.pick(icons)
  ]
})
export class LandingPageModule { }
