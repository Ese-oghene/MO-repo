import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SharedServicesService } from '../../../../shared-services/src/lib/shared-services.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

 // Properties to bind with the form
 name: string = '';
 description: string = '';
 category_name: string = '';
 sub_category_name: string = ''
 price: string = '';
 stock: string= '';

  constructor(private sharedService: SharedServicesService, private router: Router) {}

  orderNow() {
  const token = localStorage.getItem('token');
  if (!token) {
    this.router.navigate(['/login']);
    return;
  }

  const orderData = {
    name: this.name,
    description: this.description,
    
    sub_category_name: this.sub_category_name,
    price: this.price,

  };

  console.log('Order placed:', orderData);

  // Submit order logic here
  // this.sharedService.submitOrder(orderData).subscribe({
  //   next: (res) => {
  //     console.log('Order successful:', res);
  //     alert('Order placed successfully!');

  //   },

  //   error: (err) => {
  //     console.error('Order failed:', err);
  //     alert('Order failed. Please try again.');
  //   }
  // });

  }


}
