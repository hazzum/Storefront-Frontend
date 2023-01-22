import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

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
    firstValueFrom(this.productService.getProductById(id as unknown as number)).then(data => this.product = data)
  }

  goBack(): void {
    this.router.navigate(['/'])
  }

}
