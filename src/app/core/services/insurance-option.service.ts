import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InsuranceOption } from '../models/insurance-option.model';
import { environment } from 'src/environments/environment';
import { PremiumCalculationRequest } from '../models/premium-calculation-request.model';

@Injectable({
  providedIn: 'root'
})
export class InsuranceOptionService {
  private insuranceOptionsEndpoint = environment.insuranceOptionsEndpoint;
  private calculatePremiumEndpoint = environment.calculatePremiumEndpoint; 

  constructor(private httpClient: HttpClient) { }

  // Get insurance options
  getInsuranceOptions(): Observable<InsuranceOption[]> {
    return this.httpClient.get<InsuranceOption[]>(this.insuranceOptionsEndpoint);
  }

  // Calculate premium based on user input
  calculatePremium(requestData: PremiumCalculationRequest): Observable<{ premium: number }> {
    return this.httpClient.post<{ premium: number }>(this.calculatePremiumEndpoint, requestData); 
  }
}
