import { Component, OnInit } from '@angular/core'; 
import { UserProfileService } from '../core/services/user-profile.service';
import { AuthService } from '../authentication/services/auth.service';
import { SharedDataService } from '../core/services/shared-data.service'; 
import { InsuranceAmountFinalService } from './services/insurance-amount-final.service';
import { InsuranceAmountFinal } from './models/insurance-amount-final.model';
import { CreatePaymentRequest } from './models/create-payment-request.model';
import { UserProfile } from '../core/models/user-profile.model';
import { Router } from '@angular/router'; // Import Router for navigation

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
    private sharedDataService: SharedDataService,
    private insuranceAmountService: InsuranceAmountFinalService,
    private router: Router // Inject Router for navigation
  ) {
    this.userId = Number(this.authService.getUserId()) || 0; // Ensure userId is a number
  }

  ngOnInit(): void {
    console.log('User ID:', this.userId);

    this.proposalId = this.sharedDataService.getProposalID();
    console.log('Proposal ID:', this.proposalId);

    if (this.userId > 0) {
      this.userProfileService.getUserProfileById(this.userId).subscribe(
        (profile: UserProfile) => {
          this.userProfile = profile;
          console.log('User Profile:', this.userProfile);
        },
        (error) => {
          console.error('Error fetching user profile:', error);
        }
      );

      this.insuranceAmountService.getFinalInsuranceAmount(this.userId, this.proposalId).subscribe(
        (insuranceAmount: InsuranceAmountFinal) => {
          this.amount = insuranceAmount.amount; 
          console.log('Insurance Amount:', this.amount);
        },
        (error) => {
          console.error('Error fetching insurance amount:', error);
        }
      );
    } else {
      console.error('Invalid user ID:', this.userId);
    }
  }

  payNow() {
    console.log('Initiating Payment with Amount:', this.amount); 

    const options = {
      description: 'Payment for Insta Drive Automobile Insurance',
      currency: 'INR',
      amount: this.amount * 100, 
      name: this.userProfile?.fullName || 'Guest',
      key: 'rzp_test_FNm44agxaFAlLD',
      image: 'https://i.imgur.com/FApqk3D.jpeg',
      prefill: {
        name: this.userProfile?.fullName || '',
        email: this.userProfile?.email || '',
        contact: this.userProfile?.phoneNumber || '', 
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
        this.handlePaymentSuccess(response);
      },
      // Add a failure handler to deal with payment failures
      // Razorpay now allows a handler for the 'modal' object
      // This could be a custom logic to show an error message or similar
      // Note: The Razorpay documentation should be checked for the latest features
      error: (error: any) => {
        this.handlePaymentFailure(error);
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }

  // Handle successful payment
  handlePaymentSuccess(response: any) {
    console.log('Payment Success:', response);

    const paymentRequest: CreatePaymentRequest = {
      paymentDate: new Date(),
      paymentMethod: 'Razorpay',
      transactionId: response.razorpay_payment_id,
      paymentStatus: 'Completed',
    };

    this.insuranceAmountService.updatePaymentRequest(this.userId, this.proposalId, paymentRequest).subscribe(
      (res) => {
        console.log('Payment request updated successfully:', res);
        this.router.navigate(['/']); // Navigate to the home page
      },
      (error) => {
        console.error('Error updating payment request:', error);
        // You might want to handle this case too, such as logging an error message
      }
    );
  }

  // Handle failed payment
  handlePaymentFailure(error: any) {
    console.log('Payment Failure:', error);
    const paymentId = error.error?.metadata?.payment_id;

    const paymentRequest: CreatePaymentRequest = {
      paymentDate: new Date(),
      paymentMethod: 'Razorpay',
      transactionId: paymentId || 'N/A',
      paymentStatus: 'Failed',
    };

    this.insuranceAmountService.updatePaymentRequest(this.userId, this.proposalId, paymentRequest).subscribe(
      (res) => {
        console.log('Failed payment request updated successfully:', res);
        // Consider logging or displaying an error message in a user-friendly way
      },
      (error) => {
        console.error('Error updating failed payment request:', error);
      }
    );

    if (paymentId) {
      console.error(`Payment failed with Payment ID: ${paymentId}. Please try again.`);
    } else {
      console.error('Payment failed. Please try again.');
    }
  }
}
