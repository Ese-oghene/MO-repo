import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SharedServicesService } from '../../../../shared-services/src/lib/shared-services.service';
import { User } from '../../../../shared-services/src/lib/models/user.model';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  user: User = new User();
    // name: string = '';
    // email: string = '';
    // password: string = '';
    // confirmPassword: string = '';
    // phone_no:string= '';

    constructor(private sharedService: SharedServicesService, private router: Router) {}

    onSignup() {
    if (this.user.password !== this.user.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const { name, email, password, confirmPassword, phone_no } = this.user;

    this.sharedService.signup({ name, email, password, confirmPassword, phone_no }).subscribe({
      next: (res) => {
        alert('Signup successful!');
        console.log(res);
        this.user = new User(); // reset the form
      },
      error: (err) => {
        alert('Signup failed!');
        console.error(err);
      }
    });

    }
}
