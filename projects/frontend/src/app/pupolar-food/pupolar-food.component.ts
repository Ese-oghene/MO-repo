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

  constructor(private sharedService: SharedServicesService) {}

  ngOnInit(): void {
    this.sharedService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data; // Adjust based on actual API structure
      },
      error: (err) => {
        console.error('Failed to fetch products', err);
      }
    });
  }

}
