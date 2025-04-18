import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-view-all',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent],
  templateUrl: './view-all.component.html',
  styleUrl: './view-all.component.css'
})
export class ViewAllComponent {

}
