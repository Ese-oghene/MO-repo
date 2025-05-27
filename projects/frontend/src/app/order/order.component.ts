import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServicesService } from '../../../../shared-services/src/lib/shared-services.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  cartItems: any[] = [];
  user: any = null;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private sharedService: SharedServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Ensure the user is authenticated
    const token = this.sharedService.getToken();
    if (!token) {
      alert('You must be logged in to place an order.');
      this.router.navigate(['/login']);
      return;
    }

    // Get user and cart items
    this.sharedService.user$.subscribe(user => {
      this.user = user;
    });

    this.cartItems = this.sharedService.getCartItems();
    if (this.cartItems.length === 0) {
      this.errorMessage = 'Your cart is empty.';
    }
  }

  orderNow(): void {
    if (!this.cartItems.length || !this.user) {
      this.errorMessage = 'Cannot place order. Missing user or cart items.';
      return;
    }

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    // Calculate total
    const total = this.cartItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    const orderPayload = {
    order_items: this.cartItems.map(item => ({
    product_id: item.id,
    quantity: item.quantity,
    price: item.price // ✅ include the price
    })),
      total: this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };


    this.sharedService.placeOrder(orderPayload).subscribe({
      next: (res) => {
        this.loading = false;
        this.successMessage = 'Order placed successfully!';
        this.sharedService.clearCart(); // Clear cart after successful order

        // Redirect to success page after short delay
        setTimeout(() => {
          this.router.navigate(['/order-success']);
        }, 1000);
        
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Order failed. Please try again.';
        console.error('Order error:', err);
      }
    });
  }

}


