import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private httpClient: HttpClient) { }

  getProducts() : Observable<Product[]> {
    return this.httpClient.get<Product[]>("assets/data.json")
  }
  

}
