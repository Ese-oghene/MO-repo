import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

    // Properties to bind with the form
    name: string = '';
    email: string = '';
    password: string = '';
    confirmPassword: string = '';
    phone_no:string= '';

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
