import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartItems = [
    {
      name: 'kilishi',
      image: '../home-img/kilishi.jpeg',
      price: 1000,
      quantity: 1
    },
    {
      name: 'kilishi',
      image: '../home-img/kilishi.jpeg',
      price: 1200,
      quantity: 1
    }
  ];

  // Calculate total price of the cart
  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Remove an item from the cart
  removeFromCart(item: any): void {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

  // Update the cart when quantity changes
  updateCart(): void {
    // Logic to handle cart updates, if necessary
  }


}
