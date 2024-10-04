import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InsuranceAmountFinal } from '../models/insurance-amount-final.model';
import { CreatePaymentRequest } from '../models/create-payment-request.model'; // Import CreatePaymentRequest model

@Injectable({
  providedIn: 'root'
})
export class InsuranceAmountFinalService {
  
  private insuranceEndpoint = environment.insuranceAmountEndpoint; 
  private paymentEndpoint = environment.paymentEndpoint;       

  constructor(private httpClient: HttpClient) {}

  // Method to get the final insurance amount
  getFinalInsuranceAmount(userId: number, proposalId: number): Observable<InsuranceAmountFinal> {
    const url = `${this.insuranceEndpoint}/${userId}/${proposalId}`;
    return this.httpClient.get<InsuranceAmountFinal>(url);
  }

  // Method to update payment request using PATCH
  updatePaymentRequest(userId: number, proposalId: number, paymentRequest: CreatePaymentRequest): Observable<any> {
    const url = `${this.paymentEndpoint}/${userId}/${proposalId}`;
    return this.httpClient.patch<any>(url, paymentRequest);
  }
}
