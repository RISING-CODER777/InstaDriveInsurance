import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private vehicleEndpoint = environment.vehicleEndpoint; 

  constructor(private httpClient: HttpClient) {}

  // Submit vehicle information
  submitVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.httpClient.post<Vehicle>(this.vehicleEndpoint, vehicle);
  }
}
