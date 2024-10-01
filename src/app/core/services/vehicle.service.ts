import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';
import { environment } from 'src/environments/environment';
import { PremiumProposalCoverage } from '../models/premium-proposal-coverage.model';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private vehicleEndpoint = environment.vehicleEndpoint; 
  private premiumProposalCoverageEndpoint = environment.premiumProposalCoverageEndpoint; 


  constructor(private httpClient: HttpClient) {}

  // Submit vehicle information
  submitVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.httpClient.post<Vehicle>(this.vehicleEndpoint, vehicle);
  }

   // Submit premium proposal coverage information
   submitPremiumProposalCoverage(proposal: PremiumProposalCoverage): Observable<any> {
    return this.httpClient.post<any>(this.premiumProposalCoverageEndpoint, proposal);
  }
}
