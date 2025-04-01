import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
// import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent {

}
