import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShoppingCartService } from '../../../../../services/shopping-cart.service';
import { Product } from '../../../../../models/product';
import { ProductCommand } from 'src/app/models/command';

interface CartItem {
  product: Product;
  quantity: number;
}
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})

export class ShoppingCartComponent implements OnInit {
 
  cartItems: Product[] = [];
  cartItem: ProductCommand[] = [];
  productCommandQuantities: any = {};
  product: Product = new Product();

  qty!:any;
  discount!:any;
   currentDate = new Date();
   priceTotal!: number;
  constructor(private shoppingCartService: ShoppingCartService,private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.loadCartItems();
    
   }
  
  loadCartItems(): void {
    
    this.cartItems = this.shoppingCartService.getCartItems();
  }

  removeCartItem(item: Product): void {
    this.shoppingCartService.removeCartItem(item);
    this.loadCartItems();
  }

  clearCart(): void {
    this.shoppingCartService.clearCart();
    this.loadCartItems();
  }
 

   calculatePriceTotal(quantity:number, unitPrice:number,discount:number) {
    
    
   

    const discountedPrice = unitPrice - (unitPrice * (discount/ 100));
    const priceTotal = quantity * discountedPrice;
    //return discountedPrice;
      
      
      return priceTotal;
  }
  

  
sendDataToService(): void {
  const productCommands = this.cartItems.map((item) => ({
    product: item,
    createdAt: this.currentDate,
    priceTotal: item.priceTotal,
    quantity:this.productCommandQuantities[item.id]
    
  }));

  console.log("product", productCommands);
  this.shoppingCartService.storeData(productCommands);
}
updatePriceTotal(productId: number, quantity: number): void {
  const item = this.cartItems.find((item) => item.id === productId);
  if (item) {
    item.priceTotal = quantity * item.price;
    this.priceTotal = item.priceTotal;
    console.log("data update",this.priceTotal);
  }
}


}  