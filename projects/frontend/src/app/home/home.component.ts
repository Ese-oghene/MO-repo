import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { PupolarFoodComponent } from "../pupolar-food/pupolar-food.component";
import { OurFoodProductComponent } from "../our-food-product/our-food-product.component";
import { AboutComponent } from "../about/about.component";
import { FooterComponent } from "../footer/footer.component";
import { ContactComponent } from "../contact/contact.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, PupolarFoodComponent, OurFoodProductComponent, AboutComponent, FooterComponent, ContactComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

}
