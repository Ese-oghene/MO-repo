import { Component, HostListener ,OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from "../hero/hero.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HeroComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  backgroundImage = "url('../home-img/header-background.jpg')";

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.triggerSlideIn();
  }

  triggerSlideIn() {
    const textSection = document.getElementById('textSection');
    const imageSection = document.getElementById('imageSection');

    if (textSection) {
      setTimeout(() => {
        textSection.classList.add('active');
      }, 500);
    }

    if (imageSection) {
      setTimeout(() => {
        imageSection.classList.add('active');
      }, 700);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('bg-dark');
      } else {
        navbar.classList.remove('bg-dark');
      }
    }
  }

  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

}
