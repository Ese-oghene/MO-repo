import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedServicesService } from '../../../../shared-services/src/lib/shared-services.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-our-food-product',
  standalone: true,
  imports: [RouterModule,CommonModule ],
  templateUrl: './our-food-product.component.html',
  styleUrl: './our-food-product.component.css'
})
export class OurFoodProductComponent{

 products: any[] = [];

  constructor(private sharedService: SharedServicesService) {}

  ngOnInit(): void {
    this.sharedService.getProductsByCategoryName('Beef Jerky').subscribe({
      next: (res) => this.products = res.data,
      error: (err) => console.error('Failed to load Hot Sale products', err)
    });
  }



}







