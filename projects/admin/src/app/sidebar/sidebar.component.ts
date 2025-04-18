import { Component, Input,  AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements AfterViewInit{

  ngAfterViewInit(): void {
    const toggleButton = document.getElementById("desktopToggle");
    const body = document.body;

    toggleButton?.addEventListener("click", () => {
      body.classList.toggle("sidebar-collapsed");
    });

  }

}
