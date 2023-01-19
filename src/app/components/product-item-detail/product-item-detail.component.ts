import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  product!: Product
  constructor(private productService: ProductsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')
    if (isNaN(id as unknown as number) || !id) { this.router.navigate(['/']) }
    this.productService.getProducts().subscribe(data => {
      data.forEach(ele => {
        if (ele.id == id as unknown as number) {
          this.product = ele
        }
      })
    })
  }

  goBack(): void {
    this.router.navigate(['/'])
  }

}
