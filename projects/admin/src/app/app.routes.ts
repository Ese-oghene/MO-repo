import { Routes } from '@angular/router';

import { ProductsComponent } from './products/products.component';

import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { ViewAllComponent } from './view-all/view-all.component';
import { AddOrdersComponent } from './add-orders/add-orders.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'admin/login', component: LoginComponent },
  {path: 'view-all', component: ViewAllComponent},
  {path: 'add-orders', component: AddOrdersComponent},
  {path: 'view-orders', component: ViewOrdersComponent},

];
