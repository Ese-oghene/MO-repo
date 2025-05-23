import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServicesService } from '../../../../shared-services/src/lib/shared-services.service';
import { Order } from '../../../../shared-services/src/lib/models/order.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-edit-order',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, SidebarComponent ],
  templateUrl: './edit-order.component.html',
  styleUrl: './edit-order.component.css'
})
export class EditOrderComponent {
  orderId!: number;
  order: any = {
    user: {
    name: '',
    phone_no: ''
  }
  };


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedServicesService
  ) {}

    ngOnInit(): void {
    this.orderId = +this.route.snapshot.paramMap.get('id')!;
    this.loadOrder();
  }

  loadOrder(): void {
    this.sharedService.getOrderById(this.orderId).subscribe({
      next: (res) => {
        // this.order = res;
         this.order = res.data; // 👈 this is the correct level
      // if (!this.order.user) {
      //   this.order.user = { name: '', phone_no: '' };
      // }
      },
      error: (err) => {
        console.error('Failed to fetch order:', err);
      }
    });
  }

  onSubmit(): void {
    this.sharedService.updateOrder(this.orderId, this.order).subscribe({
      next: () => {
        alert('Order updated successfully');
        this.router.navigate(['/view-orders']);
      },
      error: (err) => {
        console.error('Failed to update order', err);
        alert('Error updating order');
      }
    });
  }


}
