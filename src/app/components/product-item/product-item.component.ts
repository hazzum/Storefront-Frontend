import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product!: Product;
  numbers: number[]

  constructor(private orderService: OrdersService, private auth: AuthService, private router: Router) {
    this.numbers = new Array(30).fill(0).map((x, i)=>i)
  }

  async addToCart(product: Product): Promise<void> {
    if (!this.auth.getToken()) {
      this.router.navigate(['/login'])
      return
    }
    if(!this.product.quantity) {
      return
    }
    try {
      await this.orderService.addToCart(product)
      alert(`${product.name} has been added to the cart!`)
      this.product.quantity = 0
    } catch (error: any) {
      alert('Error: '+ error.error)
    }
  }
}
