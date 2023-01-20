import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  total!: number;
  customer!: string;
  constructor(private orderService: OrdersService, private auth: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.total = this.orderService.getPurchase().total
    this.customer = this.orderService.getPurchase().name
    if (!this.auth.getToken()) {
      this.router.navigate(['/login'])
    }
    else if (!this.customer) {
      this.router.navigate(['/'])
    }
  }
}