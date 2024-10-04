export interface CreatePaymentRequest {
    paymentDate: Date;          
    paymentMethod: string;       
    transactionId: string;       
    paymentStatus: string;       
  }