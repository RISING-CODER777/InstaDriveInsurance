import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InsurancePlans } from '../models/insurance-plans.model';

@Injectable({
  providedIn: 'root'
})
export class InsurancePlansService {

  private insurancePlansEndpoint = environment.insurancePlansEndpoint;

  constructor(private httpClient: HttpClient) { }

  getInsurancePlans(): Observable<InsurancePlans[]> {
    return this.httpClient.get<InsurancePlans[]>(this.insurancePlansEndpoint);
  }  
}
