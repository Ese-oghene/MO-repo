import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedServicesService } from '../../../../shared-services/src/lib/shared-services.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pupolar-food',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './pupolar-food.component.html',
  styleUrl: './pupolar-food.component.css'
})
export class PupolarFoodComponent implements OnInit {


  products: any[] = [];
  zoboProducts: any[] = [];

  constructor(private sharedService: SharedServicesService) {}


    ngOnInit(): void {
    this.sharedService.getProductsByCategoryName('Banana Cake').subscribe({
      next: (res) => this.products = res.data,
      error: (err) => console.error('Failed to load Hot Sale products', err)
    });

      this.sharedService.getProductsByCategoryName('Zobo Drink').subscribe({
    next: (res) => this.zoboProducts = res.data,
    error: (err) => console.error('Failed to load Zobo Drink products', err)
  });
}

}


  // Zobo Drink
//   this.sharedService.getProductsByCategoryName('Zobo Drink').subscribe({
//     next: (res) => this.zoboProducts = res.data,
//     error: (err) => console.error('Failed to load Zobo Drink products', err)
//   });
// }


  // ngOnInit(): void {
  //   this.sharedService.getPublicProducts().subscribe({
  //     next: (res) => {
  //       this.products = res.data;
  //     },
  //     error: (err) => {
  //       console.error('Failed to fetch public products', err);
  //     }
  //   });
  // }

  // ngOnInit(): void {
  //   this.sharedService.getAllProducts().subscribe({
  //     next: (res) => {
  //       this.products = res.data;
  //     },
  //     error: (err) => {
  //       console.error('Failed to fetch products', err);
  //     }
  //   });
  // }


