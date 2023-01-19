import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product!: Product;
  numbers: number[]

  constructor(private orderService: OrdersService) {
    this.numbers = new Array(30).fill(0).map((x, i)=>i)
  }

  addToCart(product: Product): void {
    if(!this.product.quantity) {
      return
    }
    this.orderService.addToCart(product)
    
    alert(`${product.name} has been added to the cart!`)
  }

}
