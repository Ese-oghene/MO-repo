import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
// import { SharedServicesService } from 'shared-services';
import { SharedServicesService } from '../../../../shared-services/src/lib/shared-services.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {


    name: string = '';
    email: string = '';
    password: string = '';
    confirmPassword: string = '';
    phone_no:string= '';

    constructor(private sharedService: SharedServicesService, private router: Router) {}

    onSignup() {
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      const user = {
        name: this.name,
        email: this.email,
        password: this.password,
        phone_no: this.phone_no,
      };

      this.sharedService.signup(user).subscribe({
        next: (res) => {
          alert('Signup successful!');
          console.log(res);
          // clear fields
          this.name = '';
          this.email = '';
          this.password = '';
          this.confirmPassword = '';
          this.phone_no = '';
        },
        error: (err) => {
          alert('Signup failed!');
          console.error(err);
        }
      });

    }
}
