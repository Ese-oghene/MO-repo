import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute} from '@angular/router';
import { SharedServicesService } from '../../../../shared-services/src/lib/shared-services.service';
import { Login } from '../../../../shared-services/src/lib/models/login.model';
import { filter, take } from 'rxjs/operators'; // ✅ Add this line

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

   loginData: Login = {
    email: '',
    password: '',
    rememberMe: false
  };

  constructor(private sharedService: SharedServicesService, private router: Router,
    private route: ActivatedRoute) {
      // Log the returnUrl query param here to debug
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    console.log('returnUrl in constructor:', returnUrl);
    }

  // onLogin(): void {
  //   if (!this.loginData.email || !this.loginData.password ) {
  //     alert('Please fill out all fields.');
  //     return;
  //   }


  //   const credentials = {
  //     email: this.loginData.email,
  //     password: this.loginData.password,
  //   };

  //   this.sharedService.login(credentials).subscribe({
  //     next: (res) => {
  //       console.log('Login response:', res);

  //       const token = res.data.token;
  //       const user = res.data.user;
  //       const role = res.data.role;

  //       console.log('Token:', token);

  //       if (token) {
  //         localStorage.setItem('auth_token', token);
  //         console.log('Token saved to localStorage.');

  //         this.sharedService.refreshUser(); // 👈 add this here

  //         if (role === 'admin') {
  //           window.location.href = `http://localhost:4300?auth_token=${token}`;
  //         } else if (role === 'user') {
  //           alert('Hello User.');

  //            const redirectTo = this.route.snapshot.queryParamMap.get('returnUrl') || '/order';
  //           console.log('Redirecting to:', redirectTo);  // <-- Add this log too to check the redirect URL
  //           this.router.navigateByUrl(redirectTo);

  //         } else {
  //           alert('Unknown role. Cannot redirect.');
  //         }
  //       } else {
  //         console.warn('No token received!');
  //       }

  //       this.loginData.email = '';
  //       this.loginData.password = '';
  //     },
  //     error: (err) => {
  //       console.error('Login failed', err);
  //       alert('Login failed. Please check your credentials.');
  //     }
  //   });
  // }


  onLogin(): void {
  if (!this.loginData.email || !this.loginData.password) {
    alert('Please fill out all fields.');
    return;
  }

  const credentials = {
    email: this.loginData.email,
    password: this.loginData.password,
  };

  this.sharedService.login(credentials).subscribe({
    next: (res) => {
      const token = res.data.token;
      const role = res.data.role;

      if (token) {
        localStorage.setItem('auth_token', token);
        console.log('Token saved to localStorage.');

        // ✅ Refresh user info after saving token
        this.sharedService.refreshUser();

        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/order';
        console.log('Redirecting to:', returnUrl);

        // ✅ Wait until user is available before navigating
        this.sharedService.user$.pipe(
          filter(user => !!user),
          take(1)
        ).subscribe(() => {
          if (role === 'admin') {
            window.location.href = `http://localhost:4300?auth_token=${token}`;
          } else if (role === 'user') {
            this.router.navigateByUrl(returnUrl);
          } else {
            alert('Unknown role. Cannot redirect.');
          }
        });
      } else {
        console.warn('No token received!');
      }

      this.loginData.email = '';
      this.loginData.password = '';
    },
    error: (err) => {
      console.error('Login failed', err);
      alert('Login failed. Please check your credentials.');
    }
  });
}


  }

