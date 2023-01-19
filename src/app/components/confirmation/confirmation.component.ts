import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  orders!: Product[];
  constructor(private orderService: OrdersService) { }
  ngOnInit(): void {
    this.orders = this.orderService.getOrders()
  }
  getTotal(): number {
    let sum = 0
    this.orders.forEach((order) => { sum += order.price * (order.quantity || 0) })
    return sum.toFixed(2) as unknown as number
  }
}
