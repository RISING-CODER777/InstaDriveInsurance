import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InsuranceOptionSelection } from '../models/insurance-option-selection.model';  // Import the model
import { environment } from 'src/environments/environment';  // Import environment for the endpoint

@Injectable({
  providedIn: 'root'
})
export class InsuranceOptionSelectionService {
  private insuranceOptionSelectionEndpoint = environment.insuranceOptionSelectionEndpoint;  // Use the endpoint from environment.ts

  constructor(private http: HttpClient) {}

  // Method to post the selected options
  postSelectedOptions(options: InsuranceOptionSelection[]): Observable<any> {
    return this.http.post(`${this.insuranceOptionSelectionEndpoint}`, options);
  }
}
