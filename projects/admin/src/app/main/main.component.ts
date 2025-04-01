import { Component } from '@angular/core';
import { AddproductComponent } from "../addproduct/addproduct.component";


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [AddproductComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
