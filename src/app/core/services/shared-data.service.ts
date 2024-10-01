import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private vehicleType: string = '';
  private vehicleNumber: string = ''; 
  private engineCC: number = 0;
  private seatingCapacity: string = '';
  private planType: string = '';
  private planId: number = 0; 
  private planName: string = ''; // New variable for plan name
  private premiumAmount: number = 0;

  private readonly PROPOSAL_ID_KEY = 'proposalID'; // Key for local storage

  // Setters and getters for vehicleType
  setVehicleType(type: string) {
    this.vehicleType = type;
  }

  getVehicleType(): string {
    return this.vehicleType;
  }

  // Setters and getters for vehicleNumber
  setVehicleNumber(number: string) {
    this.vehicleNumber = number;
  }

  getVehicleNumber(): string {
    return this.vehicleNumber;
  }

  // Setters and getters for engineCC
  setEngineCC(cc: number) {
    this.engineCC = cc;
  }

  getEngineCC(): number {
    return this.engineCC;
  }

  // Setters and getters for seatingCapacity
  setSeatingCapacity(capacity: string) {
    this.seatingCapacity = capacity;
  }

  getSeatingCapacity(): string {
    return this.seatingCapacity;
  }

  // Setters and getters for planType
  setPlanType(planType: string) {
    this.planType = planType;
  }

  getPlanType(): string {
    return this.planType;
  }

  // Setters and getters for planId
  setPlanId(planId: number) {
    this.planId = planId;
  }

  getPlanId(): number {
    return this.planId;
  }

  // Setters and getters for planName
  setPlanName(planName: string) {
    this.planName = planName;
  }

  getPlanName(): string {
    return this.planName;
  }

  // Setters and getters for premiumAmount
  setPremiumAmount(amount: number) {
    this.premiumAmount = amount;
  }

  getPremiumAmount(): number {
    return this.premiumAmount;
  }

  // Setters and getters for proposalID using local storage
  setProposalID(id: number) {
    localStorage.setItem(this.PROPOSAL_ID_KEY, id.toString()); // Store in local storage
  }

  getProposalID(): number {
    const id = localStorage.getItem(this.PROPOSAL_ID_KEY);
    return id ? parseInt(id, 10) : 0; // Retrieve from local storage
  }

  clearData(): void {
    this.vehicleType = '';
    this.vehicleNumber = ''; 
    this.engineCC = 0;
    this.seatingCapacity = '';
    this.planType = '';
    this.planId = 0;
    this.planName = ''; // Clear planName as well
    this.premiumAmount = 0;

    // Clear proposalID from local storage
    localStorage.removeItem(this.PROPOSAL_ID_KEY);
  }

  // Print the shared data
  printSharedData(): void {
    console.log('Shared Data:', {
      vehicleType: this.vehicleType,
      vehicleNumber: this.vehicleNumber, 
      engineCC: this.engineCC,
      seatingCapacity: this.seatingCapacity,
      planType: this.planType,
      planId: this.planId,
      planName: this.planName, // Log the planName
      premiumAmount: this.premiumAmount,
      proposalID: this.getProposalID(), // Get proposalID from local storage for logging
    });
  }
}
