import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  listOfOrders!: any[]
  isEmpty!: boolean

  constructor(private orderService: OrdersService, private auth: AuthService, private router: Router) {
    this.isEmpty = true
  }

  ngOnInit(): void {
    if (!this.auth.getToken()) {
      this.router.navigate(['/login'])
    }
    this.orderService.getHistory().then( data => {
      if(data) {
        this.isEmpty=false
        this.listOfOrders=data
      }
    })
  }
}
