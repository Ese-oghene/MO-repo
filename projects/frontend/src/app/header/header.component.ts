import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SharedServicesService } from '../../../../shared-services/src/lib/shared-services.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  backgroundImage = "url('../home-img/232am.png')";

  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  constructor(private sharedService: SharedServicesService, private router: Router) {}

  logout(): void {
    this.sharedService.logoutApi().subscribe({
      next: () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout API failed', err);
        localStorage.removeItem('token'); // Still remove token if API fails
        this.router.navigate(['/login']);
      }
    });
}
}
