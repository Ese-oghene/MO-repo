import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import{  ProductDetailsComponent} from './product-details/product-details.component'
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OrderComponent } from './order/order.component'
import { CartComponent } from './cart/cart.component';
import {OrderSuccessComponent} from './order-success/order-success.component';

export const routes: Routes = [
   { path: '', component: HomeComponent },
   {path: 'login', component:LoginComponent },
   {path:'signup', component:SignupComponent},
   { path: 'productdetails/:id', component: ProductDetailsComponent },
   { path: 'order', component: OrderComponent,  canActivate: [AuthGuard]},
   {path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuard]},
   {path: 'cart', component:CartComponent}

];
