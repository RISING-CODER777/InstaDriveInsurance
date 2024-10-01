export interface InsuranceOption {
  optionID: number; // Added optionId property
  optionType: string;
  optionName: string;
  description: string;
  price: number;
  coverageAmount: number;
  selected?: boolean; // Optional property for selected state
}
