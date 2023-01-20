import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  form!: FormGroup
  @Input() length!: number

  constructor(private fb: FormBuilder, private router: Router, private order: OrdersService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(6)]],
      card: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern('[0-9]*')]],
    })
  }

  async onSubmit() {
    if(confirm("Are you sure you want to proceed with this order")) {
      await this.order.confirm(this.form.value.name, this.length)
      this.router.navigate(['../confirmation'])
    }
  }
}
