import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-orders',
  standalone: true,
  imports: [FormsModule, SidebarComponent, NavbarComponent],
  templateUrl: './add-orders.component.html',
  styleUrl: './add-orders.component.css'
})
export class AddOrdersComponent {

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
