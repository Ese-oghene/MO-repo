import { Component } from '@angular/core';
// import { AddproductComponent } from "../addproduct/addproduct.component";
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ SidebarComponent, NavbarComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
