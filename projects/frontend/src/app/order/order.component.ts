import { Component } from '@angular/core';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
 // Properties to bind with the form
 name: string = '';
 email: string = '';
 password: string = '';
 confirmPassword: string = '';

 // Method to handle form submission
 onSignup() {
   if (this.password !== this.confirmPassword) {
     alert('Passwords do not match!');
     return;
   }

   console.log('Signup Data:', {
     name: this.name,
     email: this.email,
     password: this.password
   });


   this.name = '';
   this.email = '';
   this.password = '';
   this.confirmPassword = '';

   alert('Signup successful!');
 }
}
