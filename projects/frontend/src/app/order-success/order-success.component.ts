import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServicesService } from '../../../../shared-services/src/lib/shared-services.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-success.component.html',
  styleUrl: './order-success.component.css'
})
export class OrderSuccessComponent  implements OnInit {

  orders: any[] = [];
  loading = true;
  error = '';

  constructor(
    private sharedService: SharedServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchOrderHistory();
  }

  fetchOrderHistory(): void {
    this.sharedService.getUserOrders().subscribe({
      next: (res: any) => {
        this.orders = res?.data || [];
      },
      error: (err) => {
        this.error = 'Unable to fetch order history.';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

   goHome(): void {
    this.router.navigate(['/']);
  }


}
