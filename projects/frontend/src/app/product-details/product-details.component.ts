import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { SharedServicesService } from '../../../../shared-services/src/lib/shared-services.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  product: any;

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? parseInt(idParam, 10) : null;

    if (id !== null) {
      this.sharedService.getPublicProductById(id).subscribe({
        next: (data) => {
          this.product = data.data;
        },
        error: (err) => {
          console.error('Failed to fetch product', err);
        }
      });
    }
  }

  addToCart(): void {
    if (this.product) {
      this.sharedService.addToCart(this.product, 1);
      this.router.navigate(['/cart']);
    }
  }

  
}
