import { Component } from '@angular/core';
import { PaymentDetails } from 'src/app/models/payment';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent {
  paymentDetails: PaymentDetails = {
    name:"",
    email:"",
    card:""
  };

}
