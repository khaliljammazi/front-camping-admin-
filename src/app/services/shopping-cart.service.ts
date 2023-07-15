import { Injectable } from '@angular/core';
import { ProductCommand } from '../models/command';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private readonly CART_KEY = 'cartItems';
  private readonly DATA_KEY = 'productCommands';
  private items: Product[] = [];
  private productCommands: ProductCommand[] = [];
  constructor() {
    const storedItems = localStorage.getItem(this.CART_KEY);
    if (storedItems) {
      this.items = JSON.parse(storedItems);
    }
    const storedData = localStorage.getItem(this.DATA_KEY);
    if (storedData) {
      this.productCommands = JSON.parse(storedData);
    }
  }

  addToCart(product: Product): void {
    this.items.push(product);
    this.saveCartItems();
  }

  removeCartItem(product: Product): void {
    const index = this.items.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.saveCartItems();
    }
  }

  getCartItems(): Product[] {
    return this.items;
  }
  
  clearCart(): void {
    this.items = [];
    this.saveCartItems();
  }

  private saveCartItems(): void {
    localStorage.setItem(this.CART_KEY, JSON.stringify(this.items));
  }
  storeData(productCommands: ProductCommand[]): void {
    this.productCommands = productCommands;
    this.saveData();
    
  }

  getDataFromService(): ProductCommand[] {
    this.saveData();
    return this.productCommands;
    
  }
  private saveData(): void {
    localStorage.setItem(this.DATA_KEY, JSON.stringify(this.productCommands));
  }
}
