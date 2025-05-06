import { Component } from '@angular/core';
import { RouterModule, ActivatedRoute, Router,  } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedServicesService } from '../../../../shared-services/src/lib/shared-services.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, RouterModule, CommonModule, FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {


  product: any = {};
  productId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedServicesService
  ) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    this.sharedService.getProductById(this.productId).subscribe({
      next: (res) => {
        this.product = {
          ...res.data,
          category_name: res.data.category?.name ?? '',
          sub_category_name: res.data.sub_category?.name ?? '',
        };
      },
      error: (err) => {
        console.error('Failed to fetch product:', err);
      }
    });
  }

  handleImageInput(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.product.image = file;
    }
  }

// subitProduct() the updated one
  submitProduct(): void {
    this.sharedService.updateProduct(this.productId, this.product).subscribe({
      next: () => {
        alert('Product updated successfully');
        this.router.navigate(['/view-all']);
      },
      error: (err) => {
        console.error('Update failed:', err);
        alert('Failed to update product');
      }
    });
  }
}
