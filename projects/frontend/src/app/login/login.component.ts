import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SharedServicesService } from '../../../../shared-services/src/lib/shared-services.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private sharedService: SharedServicesService, private router: Router) {}

  onLogin(): void {
    if (!this.email || !this.password) {
      alert('Please fill out all fields.');
      return;
    }

    const credentials = {
      email: this.email,
      password: this.password,
    };

    this.sharedService.login(credentials).subscribe({
      next: (res) => {
        console.log('Login response:', res);

        const token = res.data.token;
        const user = res.data.user;
        const role = res.data.role;

        console.log('Token:', token);

        if (token) {
          localStorage.setItem('auth_token', token);
          console.log('Token saved to localStorage.');

          if (role === 'admin') {
            window.location.href = `http://localhost:4300?token=${token}`;
          } else if (role === 'user') {
            alert('Hello User.');
            window.location.href = `http://localhost:4300?token=${token}`;
          } else {
            alert('Unknown role. Cannot redirect.');
          }
        } else {
          console.warn('No token received!');
        }

        this.email = '';
        this.password = '';
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Login failed. Please check your credentials.');
      }
    });
  }

  }

