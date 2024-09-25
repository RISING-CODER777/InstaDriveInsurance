import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InsuranceOption } from '../models/insurance-option.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsuranceOptionService {
  private insuranceOptionsEndpoint = environment.insuranceOptionsEndpoint; 


  constructor(private httpClient: HttpClient) { }

  getInsuranceOptions(): Observable<InsuranceOption[]>{
    return this.httpClient.get<InsuranceOption[]>(this.insuranceOptionsEndpoint);
  }
  
}
