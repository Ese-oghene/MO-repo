import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '@shared-environment/environment';
import { User } from '../../../shared-services/src/lib/models/user.model';
import { Login } from '../../../shared-services/src/lib/models/login.model';

@Injectable({

   providedIn: 'root'

   })

export class SharedServicesService {

  private baseUrl = environment.apiBaseUrl;

  // ----- USER STATE -----
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  // ----- ORDER STATE -----
  private orderItems: any[] = [];

  constructor(private http: HttpClient) {
    this.initializeUser();
  }

  // ----- AUTH SECTION -----
  private initializeUser(): void {
    const tokenFromUrl = new URL(window.location.href).searchParams.get('auth_token');
    if (tokenFromUrl) {
      localStorage.setItem('auth_token', tokenFromUrl);
      console.log('Token set from query param');
      window.history.replaceState({}, '', window.location.pathname);
    }

    this.http.get<{ user: any }>(`${this.baseUrl}/me`)
      .pipe(tap(res => {
        this.userSubject.next(res.user);
        console.log('User role:', res.user.role);
      }))
      .subscribe({ error: err => console.error('Failed to fetch user', err) });
  }

  signup(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(credentials: Login): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  logout(): void {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.clearUser();
      return;
    }

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.http.post(`${this.baseUrl}/logout`, {}, { headers }).subscribe({
      next: () => console.log('Logged out from backend'),
      error: err => console.error('Backend logout failed', err),
      complete: () => {
        localStorage.removeItem('auth_token');
        this.clearUser();
      }
    });
  }

  clearUser() {
    this.userSubject.next(null);
  }

  // ----- PRODUCT SECTION -----
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token') || '';
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  addProduct(product: any): Observable<any> {
  const headers = this.getAuthHeaders().set('Accept', 'application/json');
  const formData = new FormData();

  Object.entries(product).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (value instanceof File || value instanceof Blob) {
        formData.append(key, value); // e.g., image file
      } else if (typeof value === 'object') {
        formData.append(key, JSON.stringify(value)); // nested object/array
      } else {
        formData.append(key, value.toString()); // string/number/boolean
      }
    }
  });

  return this.http.post(`${this.baseUrl}/admin/store`, formData, { headers });
}



  updateProduct(id: number, product: any): Observable<any> {
  const headers = this.getAuthHeaders();
  const formData = new FormData();

  formData.append('_method', 'PATCH');

  Object.entries(product).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (value instanceof File || value instanceof Blob) {
        formData.append(key, value); // File or Blob
      } else if (typeof value === 'object') {
        formData.append(key, JSON.stringify(value)); // object/array
      } else {
        formData.append(key, value.toString()); // string, number, boolean
      }
    }
  });

  return this.http.post(`${this.baseUrl}/admin/update/${id}`, formData, { headers });
}


  deleteProduct(productId: number): Observable<any> {
    const headers = this.getAuthHeaders().set('Accept', 'application/json');
    return this.http.delete(`${this.baseUrl}/admin/delete/${productId}`, { headers });
  }

  getAllProducts(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/admin/index`, { headers });
  }

  getProductById(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/admin/show/${id}`, { headers });
  }

  getPublicProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/public`);
  }

  getPublicProductById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/${id}`);
  }

  getProductsByCategoryName(categoryName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/category/${encodeURIComponent(categoryName)}`);
  }

  getProductsBySubCategoryName(subCategoryName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/subcategory/${encodeURIComponent(subCategoryName)}`);
  }

  // ----- CART SECTION -----
  private cartKey = 'cart';

  addToCart(product: any, quantity: number = 1): void {
    const items = this.getCartItems();
    const index = items.findIndex((item: any) => item.id === product.id);
    if (index !== -1) {
      items[index].quantity += quantity;
    } else {
      items.push({ ...product, quantity });
    }
    localStorage.setItem(this.cartKey, JSON.stringify(items));
  }

  getCartItems(): any[] {
    const stored = localStorage.getItem(this.cartKey);
    return stored ? JSON.parse(stored) : [];
  }

  removeFromCart(productId: number): void {
    const updated = this.getCartItems().filter(item => item.id !== productId);
    localStorage.setItem(this.cartKey, JSON.stringify(updated));
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }

  // ----- ORDER SECTION -----
  setOrder(items: any[]): void {
    this.orderItems = items;
    localStorage.setItem('order', JSON.stringify(items));
  }

  getOrder(): any[] {
    if (this.orderItems.length === 0) {
      const stored = localStorage.getItem('order');
      this.orderItems = stored ? JSON.parse(stored) : [];
    }
    return this.orderItems;
  }

  clearOrder(): void {
    this.orderItems = [];
    localStorage.removeItem('order');
  }

  placeOrder(orderPayload: any): Observable<any> {
    const headers = this.getAuthHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.baseUrl}/orders`, orderPayload, { headers });
  }

  getAllOrders(): Observable<any> {
    const headers = this.getAuthHeaders().set('Accept', 'application/json');
    return this.http.get(`${this.baseUrl}/admin/orders`, { headers });
  }

  deleteOrder(orderId: number): Observable<any> {
    const headers = this.getAuthHeaders().set('Accept', 'application/json');
    return this.http.delete(`${this.baseUrl}/admin/orders/${orderId}`, { headers });
  }

  getOrderById(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/admin/orders/${id}`, { headers });
  }

  updateOrder(id: number, payload: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.patch(`${this.baseUrl}/admin/orders/${id}`, payload, { headers });
  }

  downloadUserOrdersPdf(userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ url: string }>(`${this.baseUrl}/admin/orders/pdf/${userId}`, { headers });
  }

  getToken(): string | null {
  return localStorage.getItem('auth_token');
}

refreshUser(): void {
  const token = this.getToken();
  if (!token) return;

  const headers = this.getAuthHeaders();

  this.http.get<{ user: any }>(`${this.baseUrl}/me`, { headers }).subscribe({
    next: res => {
      this.userSubject.next(res.user);
      console.log('User refreshed:', res.user);
    },
    error: err => {
      console.error('Failed to refresh user after login:', err);
      this.userSubject.next(null);
    }
  });
}

getUserOrders(): Observable<any> {
  const headers = this.getAuthHeaders().set('Accept', 'application/json');
  return this.http.get(`${this.baseUrl}/orders/user`, { headers });
}

// getUserOrders() {
//   return this.http.get(`${this.baseUrl}/orders`);
// }

}
