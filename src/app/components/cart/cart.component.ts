import { Component, OnInit, Output } from '@angular/core';
import { PaymentDetails } from 'src/app/models/payment';
import { Product } from 'src/app/models/product';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Output() length!: number 
  orders!: Product[];
  constructor(private orderService: OrdersService) { }
  ngOnInit(): void {
    this.orders = this.orderService.getOrders()
    this.length = this.orders.length
  }
  getTotal(): number {
    let sum = 0
    this.orders.forEach((order) => { sum += order.price * (order.quantity || 0) })
    return sum.toFixed(2) as unknown as number
  }
}
