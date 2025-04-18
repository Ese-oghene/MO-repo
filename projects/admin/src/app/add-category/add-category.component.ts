import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule, SidebarComponent, NavbarComponent],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  category = {
    name: '',
    description: '',
    price: null,
    category: '',
    image: '',
  };

  submitProduct() {
    console.log('Product Submitted:', this.category);
    // You can call a service to send this to the backend
  }
}
