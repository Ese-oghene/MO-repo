import { Component, OnInit  } from '@angular/core';

import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { SharedServicesService } from '../../../../shared-services/src/lib/shared-services.service';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ SidebarComponent, NavbarComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  user$!: Observable<any>;
  role: string | null = null;

  constructor(private shared: SharedServicesService) {}

  ngOnInit(): void {
    this.user$ = this.shared.user$;

    // Subscribe to get the role
    this.shared.user$.subscribe(user => {
      if (user) {
        this.role = user.role;
      }
    });
  }






}
