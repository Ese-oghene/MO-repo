import { Component,  EventEmitter, Output, OnInit} from '@angular/core';
import{ Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SharedServicesService } from '../../../../shared-services/src/lib/shared-services.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ RouterModule, CommonModule, ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  @Output() toggleSidebar = new EventEmitter<void>();

  triggerSidebarToggle(): void {
    this.toggleSidebar.emit();
  }

   user$!: Observable<any>;
  constructor(private shared: SharedServicesService, private router: Router,) {}

  ngOnInit(): void {
    this.user$ = this.shared.user$;

  }

  logout() {
    this.shared.logout();
    window.location.href = 'http://localhost:4200/login';
  }


}
