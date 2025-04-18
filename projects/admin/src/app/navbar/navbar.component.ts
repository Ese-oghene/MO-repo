import { Component,  EventEmitter, Output} from '@angular/core';
import{ RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Output() toggleSidebar = new EventEmitter<void>();

  triggerSidebarToggle(): void {
    this.toggleSidebar.emit();
  }
}
