import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentDetails } from 'src/app/models/payment';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  paymentDetails: PaymentDetails = {
    name:"",
    address:"",
    card:""
  };
  form!: FormGroup
  @Input() length!: number

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(6)]],
      card: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
    })
  }

  onSubmit() {
    if(confirm("Are you sure you want to proceed with this order")) {
      this.router.navigate(['../confirmation'])
    }
  }
}
