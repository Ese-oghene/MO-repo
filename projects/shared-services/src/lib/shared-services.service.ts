import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedServicesService {


  private baseUrl = 'http://localhost:8000/api';

  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    this.initializeUser();
  }





  //signup user
  signup(user: {
    name: string,
    email: string,
    password: string,
    phone_no: string
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }


  private initializeUser(): void {
    const url = new URL(window.location.href);
    const tokenFromUrl = url.searchParams.get('token');

    if (tokenFromUrl) {
      localStorage.setItem('token', tokenFromUrl);
      console.log('Token set from query param');
      window.history.replaceState({}, '', window.location.pathname);
    }

    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`

      });

      this.http.get<{ user: any }>(`${this.baseUrl}/me`, { headers })
        .pipe(tap(res => {this.userSubject.next(res.user);
          console.log('User role:', res.user.role); // Optional log
        }

      ))
        .subscribe({
          error: (err) => console.error('Failed to fetch user', err)
        });


      }
  }


  //login user
  login(credentials: {
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

// logout user

  //clear user data first
  clearUser() {
  this.userSubject.next(null);
}

logout(): void {
  const token = localStorage.getItem('token');
  if (!token) {
    this.clearUser(); // fallback for clients with no token
    return;
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  this.http.post(`${this.baseUrl}/logout`, {}, { headers }).subscribe({
    next: () => {
      console.log('Logged out from backend');
    },
    error: (err) => {
      console.error('Backend logout failed', err);
    },
    complete: () => {
      // ✅ Always clean up client state
      localStorage.removeItem('token');
      this.clearUser();
    }
  });
}

//add product
addProduct(product: any): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json'
  });

  const formData = new FormData();
  formData.append('name', product.name);
  formData.append('description', product.description);
  formData.append('category_name', product.category_name);
  formData.append('sub_category_name', product.sub_category_name);
  formData.append('price', product.price);
  formData.append('stock', product.stock);
  formData.append('raw_material', product.raw_material);

  if (product.image) {
    formData.append('image', product.image); // Expecting a File object
  }

  return this.http.post(`${this.baseUrl}/admin/store`, formData, { headers });
}

// get all products
getAllProducts(): Observable<any> {
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.get(`${this.baseUrl}/admin/index`, { headers });
}

// delete product
deleteProduct(productId: number): Observable<any> {
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json'
  });

  return this.http.delete(`${this.baseUrl}/admin/delete/${productId}`, { headers });
}

// get product by id
getProductById(id: number): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.get(`${this.baseUrl}/admin/show/${id}`, { headers });
}


// update product
updateProduct(id: number, product: any): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  const formData = new FormData();
  formData.append('_method', 'PATCH');
  formData.append('name', product.name);
  formData.append('description', product.description);
  formData.append('category_name', product.category_name);
  formData.append('sub_category_name', product.sub_category_name);
  formData.append('price', product.price);
  formData.append('stock', product.stock);
  formData.append('raw_material', product.raw_material);

  if (product.image instanceof File) {
    formData.append('image', product.image);
  }

  return this.http.post(`${this.baseUrl}/admin/update/${id}`, formData, { headers });
}

}

//order
  // submitOrder(data: any): Observable<any> {
  //   const token = localStorage.getItem('token');

  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   });

  //   return this.http.post(this.baseUrl, data, { headers });

