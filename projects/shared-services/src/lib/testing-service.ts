// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable,BehaviorSubject } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import { environment } from '@shared-environment/environment';
// import { User } from '../../../shared-services/src/lib/models/user.model';
// import { Login } from '../../../shared-services/src/lib/models/login.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class SharedServicesService {

//   private baseUrl = environment.apiBaseUrl;
//   private userSubject = new BehaviorSubject<any>(null);
//   public user$ = this.userSubject.asObservable();
//   constructor(private http: HttpClient) {
//     this.initializeUser();
//   }

//   //get user data
//   private initializeUser(): void {
//     const url = new URL(window.location.href);
//     const tokenFromUrl = url.searchParams.get('auth_token');

//     if (tokenFromUrl) {
//       localStorage.setItem('auth_token', tokenFromUrl);
//       console.log('Token set from query param');
//       window.history.replaceState({}, '', window.location.pathname);
//     }

//     const token = localStorage.getItem('auth_token');
//     if (token) {
//       const headers = new HttpHeaders({
//         'Authorization': `Bearer ${token}`
//       });

//       this.http.get<{ user: any }>(`${this.baseUrl}/me`, { headers })
//         .pipe(tap(res => {this.userSubject.next(res.user);
//           console.log('User role:', res.user.role);
//         }

//       ))
//         .subscribe({
//           error: (err) => console.error('Failed to fetch user', err)
//         });

//       }
//   }

//   //signup user
//   signup(user: User): Observable<any> {
//   return this.http.post(`${this.baseUrl}/register`, user);
//   }


//   //login user

//   login(credentials: Login): Observable<any> {
//     return this.http.post(`${this.baseUrl}/login`, credentials);
//   }


//   //clear user data first
//   clearUser() {
//     this.userSubject.next(null);
//   }

//   logout(): void {
//     const token = localStorage.getItem('auth_token');
//     if (!token) {
//       this.clearUser();
//       return;
//   }

//   const headers = new HttpHeaders({
//     'Authorization': `Bearer ${token}`
//   });

//   this.http.post(`${this.baseUrl}/logout`, {}, { headers }).subscribe({
//     next: () => {
//       console.log('Logged out from backend');
//     },
//     error: (err) => {
//       console.error('Backend logout failed', err);
//     },
//     complete: () => {

//       localStorage.removeItem('token');
//       this.clearUser();
//     }
//   });
// }

// //add product
// addProduct(product: any): Observable<any> {
//   const token = localStorage.getItem('auth_token');
//   const headers = new HttpHeaders({
//     'Authorization': `Bearer ${token}`,
//     'Accept': 'application/json'
//   });

//   const formData = new FormData();
//   formData.append('name', product.name);
//   formData.append('description', product.description);
//   formData.append('category_name', product.category_name);
//   formData.append('sub_category_name', product.sub_category_name);
//   formData.append('price', product.price);
//   formData.append('stock', product.stock);
//   formData.append('raw_material', product.raw_material);

//   if (product.image) {
//     formData.append('image', product.image); // Expecting a File object
//   }

//   return this.http.post(`${this.baseUrl}/admin/store`, formData, { headers });
// }

// // get all products
// getAllProducts(): Observable<any> {
//   const token = localStorage.getItem('auth_token');

//   const headers = new HttpHeaders({
//     'Authorization': `Bearer ${token}`
//   });

//   return this.http.get(`${this.baseUrl}/admin/index`, { headers });
// }

// // get public products (no token required)
// getPublicProducts(): Observable<any> {
//   return this.http.get(`${this.baseUrl}/products/public`);
// }

// // delete product
// deleteProduct(productId: number): Observable<any> {
//   const token = localStorage.getItem('auth_token');

//   //  const headers = this.getHeadersWithAuth();
//   const headers = new HttpHeaders({
//     'Authorization': `Bearer ${token}`,
//     'Accept': 'application/json'
//   });

// // 3pcencnedvq
//   return this.http.delete(`${this.baseUrl}/admin/delete/${productId}`, { headers });
// }

// // get product by id (no token required)
// getProductById(id: number): Observable<any> {
//   const token = localStorage.getItem('auth_token');
//   const headers = new HttpHeaders({
//     'Authorization': `Bearer ${token}`
//   });
//   return this.http.get(`${this.baseUrl}/admin/show/${id}`, { headers });
// }

// // get public product by id (no token required)
// getPublicProductById(id: number): Observable<any> {
//   return this.http.get(`${this.baseUrl}/products/${id}`);
// }

// // update product
// updateProduct(id: number, product: any): Observable<any> {
//   const token = localStorage.getItem('auth_token');
//   const headers = new HttpHeaders({
//     'Authorization': `Bearer ${token}`
//   });

//   const formData = new FormData();
//   formData.append('_method', 'PATCH');
//   formData.append('name', product.name);
//   formData.append('description', product.description);
//   formData.append('category_name', product.category_name);
//   formData.append('sub_category_name', product.sub_category_name);
//   formData.append('price', product.price);
//   formData.append('stock', product.stock);
//   formData.append('raw_material', product.raw_material);

//   if (product.image instanceof File) {
//     formData.append('image', product.image);
//   }

//   return this.http.post(`${this.baseUrl}/admin/update/${id}`, formData, { headers });
// }


// // CART METHODS

// addToCart(product: any, quantity: number = 1): void {
//   const cartKey = 'cart';
//   const items = this.getCartItems();
//   const index = items.findIndex((item: any) => item.id === product.id);

//   if (index !== -1) {
//     items[index].quantity += quantity;
//   } else {
//     items.push({ ...product, quantity });
//   }

//   localStorage.setItem(cartKey, JSON.stringify(items));
// }

// getCartItems(): any[] {
//   const cartKey = 'cart';
//   const stored = localStorage.getItem(cartKey);
//   return stored ? JSON.parse(stored) : [];
// }

// removeFromCart(productId: number): void {
//   const cartKey = 'cart';
//   const updated = this.getCartItems().filter(item => item.id !== productId);
//   localStorage.setItem(cartKey, JSON.stringify(updated));
// }


// clearCart(): void {
//   localStorage.removeItem('cart');
// }


// // This service is responsible for managing the order items in the cart

// private orderItems: any[] = [];

//   setOrder(items: any[]): void {
//     this.orderItems = items;
//     localStorage.setItem('order', JSON.stringify(items)); // Optional for persistence
//   }

//   getOrder(): any[] {
//     if (this.orderItems.length === 0) {
//       const stored = localStorage.getItem('order');
//       this.orderItems = stored ? JSON.parse(stored) : [];
//     }
//     return this.orderItems;
//   }

//   clearOrder(): void {
//     this.orderItems = [];
//     localStorage.removeItem('order');
//   }

//   // Optional: send order to backend
//   placeOrder(orderPayload: any): Observable<any> {
//     const token = localStorage.getItem('auth_token');
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     });

//     return this.http.post(`${this.baseUrl}/orders`, orderPayload, { headers });
//   }

//   // Get products by category name (no auth required)
//   getProductsByCategoryName(categoryName: string): Observable<any> {
//     return this.http.get(`${this.baseUrl}/products/category/${encodeURIComponent(categoryName)}`);
//   }

//   // Get products by subcategory name (optional)
//   getProductsBySubCategoryName(subCategoryName: string): Observable<any> {
//     return this.http.get(`${this.baseUrl}/products/subcategory/${encodeURIComponent(subCategoryName)}`);
//   }

//   // Get all orders (admin only)
//   getAllOrders(): Observable<any> {
//     const token = localStorage.getItem('auth_token');
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${token}`,
//       'Accept': 'application/json'
//     });

//     return this.http.get(`${this.baseUrl}/admin/orders`, { headers });
//   }

// deleteOrder(orderId: number): Observable<any> {
//   const token = localStorage.getItem('auth_token');
//   const headers = new HttpHeaders({
//     'Authorization': `Bearer ${token}`,
//     'Accept': 'application/json'
//   });

//   return this.http.delete(`${this.baseUrl}/admin/orders/${orderId}`, { headers });
// }


// // Get order by ID (admin only)
// getOrderById(id: number): Observable<any> {
//   const token = localStorage.getItem('auth_token');
//   const headers = new HttpHeaders({
//     'Authorization': `Bearer ${token}`
//   });
//   return this.http.get(`${this.baseUrl}/admin/orders/${id}`, { headers });
// }

// updateOrder(id: number, payload: any): Observable<any> {
//   const token = localStorage.getItem('auth_token');
//   const headers = new HttpHeaders({
//     'Authorization': `Bearer ${token}`
//   });
//   return this.http.patch(`${this.baseUrl}/admin/orders/${id}`, payload, { headers });
// }


// downloadUserOrdersPdf(userId: number): Observable<any> {
//   const token = localStorage.getItem('auth_token'); // Adjust this if you use a service for token management

//   return this.http.get<{ url: string }>(
//     `${this.baseUrl}/admin/orders/pdf/${userId}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }
//   );
// }

// }
  // addProduct(product: any): Observable<any> {
  //   const headers = this.getAuthHeaders().set('Accept', 'application/json');
  //   const formData = new FormData();
  //   Object.entries(product).forEach(([key, value]) => {
  //     if (value !== undefined && value !== null) {
  //       formData.append(key, value);
  //     }
  //   });
  //   return this.http.post(`${this.baseUrl}/admin/store`, formData, { headers });
  // }

  // updateProduct(id: number, product: any): Observable<any> {
  //   const headers = this.getAuthHeaders();
  //   const formData = new FormData();
  //   formData.append('_method', 'PATCH');
  //   Object.entries(product).forEach(([key, value]) => {
  //     if (value !== undefined && value !== null) {
  //       formData.append(key, value);
  //     }
  //   });
  //   return this.http.post(`${this.baseUrl}/admin/update/${id}`, formData, { headers });
  // }



