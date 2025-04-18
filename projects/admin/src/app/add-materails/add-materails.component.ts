import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-add-materails',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent],
  templateUrl: './add-materails.component.html',
  styleUrl: './add-materails.component.css'
})
export class AddMaterailsComponent {

  // product = {
  //   name: '',
  //   description: '',
  //   price: null,
  //   category: '',
  //   image: '',
  // };

  // submitProduct() {
  //   console.log('Product Submitted:', this.product);
  //   You can call a service to send this to the backend
  // }
}
