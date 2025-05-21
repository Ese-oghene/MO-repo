import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedServicesService } from '../../../../shared-services/src/lib/shared-services.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, RouterModule, CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  constructor(private sharedService: SharedServicesService) {}

  product = {
    name: '',
    description: '',
    category_name:'',
    sub_category_name: '',
    price: null,
    stock:'',
    image: null,
    raw_material:''
  };

  submitProduct() {
    this.sharedService.addProduct(this.product).subscribe({
      next: (res) => {
        console.log('Product added:', res);
        alert('Product added successfully!');

        // Reset the form
        this.product = {
          name: '',
          description: '',
          category_name:'',
          sub_category_name: '',
          price: null,
          stock:'',
          image: null,
          raw_material:''
        };
      },



      error: (err: HttpErrorResponse) => {
        console.error('Failed to add product:', err);
        alert('Error adding product. Check console.');
      }
    });
  }

  handleImageInput(event: any) {
    this.product.image = event.target.files[0];
  }

  // submitProduct() {
  //   console.log('Product Submitted:', this.product);

  // }
}
