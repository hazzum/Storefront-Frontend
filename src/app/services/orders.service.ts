import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { environment } from 'src/environment/environment';
import { Product } from '../models/product';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  orderList: Product[] = [];
  customer!: string
  total!: number
  currentID!: number
  constructor(private auth: AuthService, private httpClient: HttpClient) {
  }

  async getOrders() {
    const userID = (jwtDecode(this.auth.getToken()) as any).id
    let currentOrder = await firstValueFrom(this.httpClient.get<any[]>(environment.apiHost + `/users/${userID}/orders/active`))
    if (currentOrder.length) {
      this.currentID = currentOrder[0].order_id
      return currentOrder[0].order_details
    }
    else {
      return []
    }
  }

  async getHistory() {
    const userID = (jwtDecode(this.auth.getToken()) as any).id
    let currentOrder = await firstValueFrom(this.httpClient.get<any[]>(environment.apiHost + `/users/${userID}/orders/completed`))
    if (currentOrder.length) {
      return currentOrder.reverse()
    }
    else {
      return []
    }
  }

  async addToCart(order: Product) {
    const userID = (jwtDecode(this.auth.getToken()) as any).id
    let found: number = -1;
    // look for the current active order
    let currentOrder = await firstValueFrom(this.httpClient.get<any[]>(environment.apiHost + `/users/${userID}/orders/active`))
    
    // if order found
    if (currentOrder.length) {
      this.currentID = currentOrder[0].order_id
      // look for matching item
      currentOrder[0].order_details.forEach((ele: any) => { if (ele.product_id == order.id) {found = ele.item_id as unknown as number } })
      // if found, update quantity
      if (found >= 0) {
        await this.update(found, order.quantity as unknown as number)
      }
      // if not, add to order
      else {
        return await firstValueFrom(
          this.httpClient.post<any>(
            environment.apiHost + `/orders/${currentOrder[0].order_id}/items/`,
            { product_id: order.id?.toString(), quantity: order.quantity }
          ))
      }
    }

    // if order not found, create one and add the item to it
    else {
      const newOrder = await firstValueFrom(
        this.httpClient.post<any>(
          environment.apiHost + `/orders/`, { status: 'active' }
        ))
      let order_item = await firstValueFrom(
        this.httpClient.post<any>(
          environment.apiHost + `/orders/${(newOrder).id}/items/`,
          { product_id: order.id?.toString(), quantity: order.quantity }
        ))
      return order_item
    }
  }

  async remove(id: number) {
    await firstValueFrom(this.httpClient.delete(environment.apiHost + `/orders/${this.currentID}/items/${id}`))
  }

  async update(id: number, updatedQuantity: number) {
    await firstValueFrom(this.httpClient.put(environment.apiHost + `/orders/${this.currentID}/items/${id}`, { quantity: updatedQuantity }))
  }

  async clearCart() {
    const userID = (jwtDecode(this.auth.getToken()) as any).id
    let currentOrder = await firstValueFrom(this.httpClient.get<any[]>(environment.apiHost + `/users/${userID}/orders/active`))
    currentOrder[0].order_details.forEach(async (ele: { item_id: number; }) =>
      await this.remove(ele.item_id)
    )
  }

  async confirm(name: string, total: number): Promise<void> {
    this.customer = name
    this.total = total
    await firstValueFrom(this.httpClient.put(environment.apiHost + `/orders/${this.currentID}`, { status: 'complete' }))
  }

  getPurchase() {
    return {
      name: this.customer,
      total: this.total
    }
  }
}
