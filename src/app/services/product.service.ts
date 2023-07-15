import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private apiUrl = environment.apiUrl;
  private activityUrl = 'http://localhost:8091/api/products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.activityUrl);
  }
  getProductById(id: number): Observable<Product> {
    const url = `${this.activityUrl}/${id}`;
    return this.http.get<Product>(url, this.httpOptions);
  }
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.activityUrl, product, this.httpOptions);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    const url = `${this.activityUrl}/${id}`;
    return this.http.put<Product>(url, product, this.httpOptions);
  }

  deleteProduct(id: number): Observable<Product> {
    const url = `${this.activityUrl}/${id}`;
    return this.http.delete<Product>(url, this.httpOptions);
  }
}
