import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products!: Product[]
  constructor (private productService: ProductsService) {
  }
  ngOnInit(): void {
    firstValueFrom(this.productService.getProducts()).then(data => {
      this.products = data.map(ele=>{
        ele.quantity=0
        return ele
      })
    })
  }

}
