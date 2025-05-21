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




name: string = '';
description: string = '';
category_name: string = '';
 sub_category_name: string = ''
 price: string = '';
 stock: string= '';


   constructor(
    private sharedService: SharedServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sharedService.user$.subscribe(user => {
      if (!user || user.role !== 'user') {
        this.router.navigate(['/login'], { queryParams: { returnUrl: '/order' } });
      }
    });
  }



   orderNow() {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    this.router.navigate(['/login']);
    return;
  }

}

}


