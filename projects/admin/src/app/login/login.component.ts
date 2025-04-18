import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminApiService } from '../services/admin-api.service'; // adjust path as needed
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(
    private adminApiService: AdminApiService,
    private router: Router
  ) {}

  onLogin(): void {
    if (!this.email || !this.password) {
      alert('Please fill out all fields.');
      return;
    }

    const loginData = {
      email: this.email,
      password: this.password
    };

    this.adminApiService.login(loginData).subscribe({
      next: (response) => {
        console.log('Login Response:', response);
        localStorage.setItem('token', response.token);
        // console.log('Token:', response.token);
        if (response.data.user.role === 'admin') {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/user']);
        }
      },
      error: (error) => {
        console.error('Login failed', error);
        alert('Invalid email or password');
      }
    });
  }

}
