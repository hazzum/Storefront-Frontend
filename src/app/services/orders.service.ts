import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  orderList: Product[] = [];
  constructor() {
  }

  getOrders() {
    return this.orderList || [];
  }

  addToCart(order: Product) {
    let index = this.orderList.findIndex(ele => ele.id == order.id)
    if (index != -1) {
      this.orderList[index] = order
    }
    else {
      this.orderList = [...this.orderList, order]
    }
    return this.orderList;
  }

  clearCart() {
    this.orderList = [];
    return this.orderList;
  }
}
