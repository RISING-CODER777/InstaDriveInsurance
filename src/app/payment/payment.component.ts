import { Component } from '@angular/core';

declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {

  payNow() {
    const options = {
      description: 'Razorpay Angular Integration',
      currency: 'INR',
      amount: 100000, // Amount in paise (INR 1000)
      name: 'Gowtham',
      key: 'rzp_test_FNm44agxaFAlLD', // Replace with your Razorpay Key ID
      image: 'https://i.imgur.com/FApqk3D.jpeg',
      prefill: {
        name: 'Gowtham',
        email: 'gowtham@gmail.com',
        phone: '9876543210'
      },
      theme: {
        color: '#6466e3'
      },
      modal: {
        ondismiss: () => {
          console.log('Transaction Cancelled');
        }
      }
    };

    const successCallback = (paymentId: any) => {
      console.log('Payment Success:', paymentId);
      alert('Payment successful!');
    };

    const failureCallback = (error: any) => {
      console.log('Payment Failure:', error);
      
      // Check if the metadata contains the payment ID
      if (error.error && error.error.metadata) {
        const paymentId = error.error.metadata.payment_id;
        const orderId = error.error.metadata.order_id;

        // Log Payment ID and Order ID if they exist
        console.log('Payment ID (Transaction ID):', paymentId);
        console.log('Order ID:', orderId);
        
        alert(`Payment failed with Payment ID: ${paymentId}. Please try again.`);
      } else {
        alert('Payment failed. Please try again.');
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }
}
