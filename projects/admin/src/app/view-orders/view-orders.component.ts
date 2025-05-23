import { Component , OnInit} from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SharedServicesService } from '../../../../shared-services/src/lib/shared-services.service';
import { Order, OrderItem } from '../../../../shared-services/src/lib/models/order.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // For navigation


@Component({
  selector: 'app-view-orders',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, CommonModule],
  templateUrl: './view-orders.component.html',
  styleUrl: './view-orders.component.css'
})

export class ViewOrdersComponent implements OnInit{
  // flatOrderItems: any[] = [];

   flatOrderItems: {
    customerName: string;
    customerPhone:string
    productName: string;
    category: string;
    price: number;
    quantity: number;
    totalPrice: number;
    status: string;
    orderId: number;
  }[] = [];

  constructor(private sharedService: SharedServicesService,  private router: Router) {}

  onEditOrder(orderId: number): void {
  this.router.navigate(['/admin/edit-order', orderId]); // Make sure this route exists
}

onDeleteOrder(orderId: number): void {
  if (confirm('Are you sure you want to delete this order?')) {
    this.sharedService.deleteOrder(orderId).subscribe({
      next: () => {
        alert('Order deleted successfully!');
        this.refreshOrders(); // Refresh the list
      },
      error: (err) => {
        console.error('Failed to delete order', err);
        alert('Error deleting order.');
      }
    });
  }
}

 ngOnInit(): void {
    this.refreshOrders();
  }

private refreshOrders(): void {
  this.sharedService.getAllOrders().subscribe({
    next: (res: { data: Order[] }) => {
      this.flatOrderItems = [];

      res.data.forEach((order: Order) => {
        order.order_items.forEach((item: OrderItem) => {
          this.flatOrderItems.push({
            customerName: order.user?.name || 'N/A',
            customerPhone: order.user?.phone_no || 'N/A',
            productName: item.product?.name || `Product #${item.product_id}`,
            category: item.product?.category?.name || 'N/A',
            price: +item.price,
            quantity: item.quantity,
            totalPrice: item.subtotal,
            status: order.status,
            orderId: order.id,
          });
        });
      });
    },
    error: (err) => console.error('Failed to fetch orders', err),
  });
  }
}

