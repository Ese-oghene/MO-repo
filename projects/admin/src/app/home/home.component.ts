import { Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { AddproductComponent } from "../addproduct/addproduct.component";
import { MainComponent } from "../main/main.component";
import { HeaderComponent } from "../header/header.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  isSidebarActive: boolean = false;
  toggleSidebar() {
   this.isSidebarActive = !this.isSidebarActive;
   const toggler = document.querySelector('.sidebar-toggler');
   if (toggler) {
     toggler.classList.toggle('active', this.isSidebarActive);
   }
 }


  // sidebarCollapsed = false;

  // toggleSidebar(): void {
  //   this.sidebarCollapsed = !this.sidebarCollapsed;
  // }

}
