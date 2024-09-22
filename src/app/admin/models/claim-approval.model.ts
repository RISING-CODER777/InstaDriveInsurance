export interface Claim{
  userId: number;
  claimNumber: string;
  name:string;
  dateOfIncident:string;
  claimAmount:number;
  approvedAmount:number;
  status:string;
  description:string;
  remarks:string;
  addOnDetails : any[],
  accidentalCoverDetails: any[],
  accessoryCoverDetails: any[],


}