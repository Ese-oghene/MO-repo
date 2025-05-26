import { Component, Input,  AfterViewInit, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedServicesService } from '../../../../shared-services/src/lib/shared-services.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements AfterViewInit, OnInit{

  ngAfterViewInit(): void {
    const toggleButton = document.getElementById("desktopToggle");
    const body = document.body;

    toggleButton?.addEventListener("click", () => {
      body.classList.toggle("sidebar-collapsed");
    });
  }

     user$!: Observable<any>;
    constructor( private shared: SharedServicesService, private router: Router,) {}

    ngOnInit(): void {
      this.user$ = this.shared.user$;

    }

    logout() {
      this.shared.logout();
      window.location.href = 'http://localhost:4200/login';
    }

}
