import { Component, OnChanges, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnChanges {
  @Output() length!: number
  orders!: Product[];
  logged!: boolean
  total: number = 0
  constructor(private orderService: OrdersService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.logged = this.auth.getToken() as unknown as boolean
    if (!this.logged) {
      this.router.navigate(['/login'])
    }
    this.orderService.getOrders().then(data => {
      this.orders = data
      this.total = 0
      this.orders.forEach((order) => { this.total += order.price * (order.quantity || 0) })
      this.total = this.total.toFixed(2) as unknown as number
      this.length = this.total
    })
  }

  ngOnChanges(): void {
    this.orderService.getOrders().then(data => {
      this.orders = data
      this.total = 0
      this.orders.forEach((order) => { this.total += order.price * (order.quantity || 0) })
      this.total = this.total.toFixed(2) as unknown as number
      this.length = this.total
    })
  }

  clearCart(): void {
    if (confirm($localize`Are you sure you want to remove all items from the cart?`)) {
      this.orderService.clearCart().then(() => {
        this.orders = []
        this.total = 0
      })
    }
  }

  remove(id: any): void {
    if (confirm($localize`Are you sure you want to remove this item from the cart?`)) {
      this.orderService.remove(id).then(() => {
        this.ngOnChanges()
      })
    }
  }

  update(id: any, quantity: any): void {
    this.orderService.update(id, quantity).then(() => {
      this.ngOnChanges()
    })
  }
}
