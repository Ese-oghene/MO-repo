import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() sidebarCollapsed = false;
  // sidebarCollapsed = false;


  // toggleSidebar(): void {
  //   this.sidebarCollapsed = !this.sidebarCollapsed;
  // }
}
