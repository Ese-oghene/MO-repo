import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-view-materials',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent],
  templateUrl: './view-materials.component.html',
  styleUrl: './view-materials.component.css'
})
export class ViewMaterialsComponent {

}
