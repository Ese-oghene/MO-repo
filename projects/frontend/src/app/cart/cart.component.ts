import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { SharedServicesService } from '../../../../shared-services/src/lib/shared-services.service';



@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];

  constructor(
    private sharedService: SharedServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const storedCart = localStorage.getItem('cart');
    this.cartItems = storedCart ? JSON.parse(storedCart) : [];
  }

  updateCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  removeFromCart(itemToRemove: any): void {
    this.cartItems = this.cartItems.filter(item => item.id !== itemToRemove.id);
    this.updateCart();
  }

  calculateTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

// checkout(): void {

//  const token = localStorage.getItem('auth_token');

//   if (!token) {
//     this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });

//     return;
//   }

//   this.sharedService.setOrder(this.cartItems);
//   this.router.navigate(['/order']);
// }

checkout(): void {
  const token = localStorage.getItem('auth_token');

  if (!token) {
    // Not logged in – redirect to login, but pass cart in memory via service
    this.sharedService.setOrder(this.cartItems);
    this.router.navigate(['/login'], { queryParams: { returnUrl: '/order' } });
    return;
  }

  // Token exists - optionally verify user role or token validity here
  this.sharedService.setOrder(this.cartItems);
  this.router.navigate(['/order']);
}


}



