import { Component } from '@angular/core';
// import { HeaderComponent } from "../header/header.component";
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, RouterModule, CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  product = {
    name: '',
    description: '',
    price: null,
    category: '',
    image: '',
  };

  submitProduct() {
    console.log('Product Submitted:', this.product);
    // You can call a service to send this to the backend
  }
}
