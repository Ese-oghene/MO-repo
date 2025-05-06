import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SharedServicesService } from '../../../../shared-services/src/lib/shared-services.service';



@Component({
  selector: 'app-view-all',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, CommonModule, RouterModule],
  templateUrl: './view-all.component.html',
  styleUrl: './view-all.component.css'
})
export class ViewAllComponent implements OnInit {

  products: any[] = [];

  constructor(private sharedService: SharedServicesService) {}

  ngOnInit(): void {
    this.sharedService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data.data;
        console.log('Fetched products:', this.products);
      },
      error: (err) => console.error('Failed to fetch products', err)
    });
  }

// deleteProduct(productId: number) {
  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.sharedService.deleteProduct(id).subscribe({
        next: () => {
          // Update UI
          this.products = this.products.filter(p => p.id !== id);
          alert('Product deleted successfully.');
        },
        error: (err) => {
          console.error('Delete failed:', err);
          alert('Failed to delete product.');
        }
      });
    }
  }


}
