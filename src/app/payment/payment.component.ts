import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../core/services/user-profile.service';
import { AuthService } from '../authentication/services/auth.service';
import { SharedDataService } from '../core/services/shared-data.service'; // Inject SharedDataService
import { InsuranceAmountFinalService } from './services/insurance-amount-final.service';
import { InsuranceAmountFinal } from './models/insurance-amount-final.model';
import { CreatePaymentRequest } from './models/create-payment-request.model';
import { UserProfile } from '../core/models/user-profile.model';

declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  userId: number; // User ID
  proposalId: number = 0; // Will get the proposal ID from SharedDataService
  userProfile: UserProfile | null = null; // Store user profile
  amount: number = 0; // Amount in INR

  constructor(
    private userProfileService: UserProfileService,
    private authService: AuthService,
    private sharedDataService: SharedDataService, // Inject the SharedDataService
    private insuranceAmountService: InsuranceAmountFinalService // Inject the service
  ) {
    // Fetch userId from AuthService in the constructor
    this.userId = Number(this.authService.getUserId()) || 0; // Ensure userId is a number
  }

  ngOnInit(): void {
    console.log('User ID:', this.userId); // Log userId

    // Fetch the proposalId from SharedDataService
    this.proposalId = this.sharedDataService.getProposalID();
    console.log('Proposal ID:', this.proposalId); // Log the retrieved proposalId

    // Fetch user profile based on user ID if valid
    if (this.userId > 0) { // Check if userId is valid (greater than 0)
      this.userProfileService.getUserProfileById(this.userId).subscribe(
        (profile: UserProfile) => {
          this.userProfile = profile;
          console.log('User Profile:', this.userProfile); // Log user profile details
        },
        (error) => {
          console.error('Error fetching user profile:', error);
        }
      );

      // Fetch the final insurance amount with the retrieved proposalId
      this.insuranceAmountService.getFinalInsuranceAmount(this.userId, this.proposalId).subscribe(
        (insuranceAmount: InsuranceAmountFinal) => {
          this.amount = insuranceAmount.amount; // Set the amount from the service response
          console.log('Insurance Amount:', this.amount); // Log the insurance amount
        },
        (error) => {
          console.error('Error fetching insurance amount:', error);
        }
      );
    } else {
      console.error('Invalid user ID:', this.userId);
      // Handle invalid user ID scenario (e.g., show a message to the user)
    }
  }

  payNow() {
    console.log('Initiating Payment with Amount:', this.amount); // Log the amount before payment

    const options = {
      description: 'Payment for Insta Drive Automobile Insurance',
      currency: 'INR',
      amount: this.amount * 100, // Amount in paise
      name: this.userProfile?.fullName || 'Guest', // Use user's full name or fallback to 'Guest'
      key: 'rzp_test_FNm44agxaFAlLD', // Replace with your Razorpay Key ID
      image: 'https://i.imgur.com/FApqk3D.jpeg',
      prefill: {
        name: this.userProfile?.fullName || '',
        email: this.userProfile?.email || '',
        contact: this.userProfile?.phoneNumber || '', // Autofill phone number from user profile
      },
      theme: {
        color: '#6466e3',
      },
      modal: {
        ondismiss: () => {
          console.log('Transaction Cancelled');
        },
      },
      handler: (response: any) => {
        this.handlePaymentSuccess(response); // Handle successful payment
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }

  // Handle successful payment
  handlePaymentSuccess(response: any) {
    console.log('Payment Success:', response);

    const paymentRequest: CreatePaymentRequest = {
      paymentDate: new Date(), // Capture the current date as payment date
      paymentMethod: 'Razorpay', // Hardcoded payment method as Razorpay
      transactionId: response.razorpay_payment_id, // Capture the transaction ID from the response
      paymentStatus: 'Completed', // Mark the payment as completed
    };

    // Call the service to update the payment request
    this.insuranceAmountService.updatePaymentRequest(this.userId, this.proposalId, paymentRequest).subscribe(
      (res) => {
        console.log('Payment request updated successfully:', res);
        alert('Payment successful and updated in the system!');
      },
      (error) => {
        console.error('Error updating payment request:', error);
        alert('Payment was successful but failed to update on the server.');
      }
    );
  }

  // Handle failed payment
  handlePaymentFailure(error: any) {
    console.log('Payment Failure:', error);
    const paymentId = error.error?.metadata?.payment_id;

    const paymentRequest: CreatePaymentRequest = {
      paymentDate: new Date(), // Set the payment date as current date
      paymentMethod: 'Razorpay', // Hardcoded payment method as Razorpay
      transactionId: paymentId || 'N/A', // Capture the transaction ID from the error response if available
      paymentStatus: 'Failed', // Mark the payment as failed
    };

    // Call the service to update the payment request with failed status
    this.insuranceAmountService.updatePaymentRequest(this.userId, this.proposalId, paymentRequest).subscribe(
      (res) => {
        console.log('Failed payment request updated successfully:', res);
        alert('Payment failed but updated in the system.');
      },
      (error) => {
        console.error('Error updating failed payment request:', error);
        alert('Payment failed and error updating the server.');
      }
    );

    if (paymentId) {
      alert(`Payment failed with Payment ID: ${paymentId}. Please try again.`);
    } else {
      alert('Payment failed. Please try again.');
    }
  }
}
