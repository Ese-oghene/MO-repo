import { Routes } from '@angular/router';

import { ProductsComponent } from './products/products.component';

import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { ViewAllComponent } from './view-all/view-all.component';
import { AddOrdersComponent } from './add-orders/add-orders.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { ViewCategoryComponent } from './view-category/view-category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddMaterailsComponent } from './add-materails/add-materails.component';
import { ViewMaterialsComponent } from './view-materials/view-materials.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { EditOrderComponent } from './edit-order/edit-order.component';



export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'admin/login', component: LoginComponent },
  {path: 'view-all', component: ViewAllComponent},
  {path: 'add-orders', component: AddOrdersComponent},
  {path: 'view-orders', component: ViewOrdersComponent},
  {path: 'view-category', component: ViewCategoryComponent},
  {path: 'add-category', component: AddCategoryComponent},
  {path: 'add-materails', component: AddMaterailsComponent},
  {path: 'view-materials', component: ViewMaterialsComponent},
  { path: 'edit-product/:id', component: EditProductComponent },
  { path: 'admin/edit-order/:id', component: EditOrderComponent }


];




