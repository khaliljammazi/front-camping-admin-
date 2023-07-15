import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Product } from 'src/app/models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Command, ProductCommand } from 'src/app/models/command';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ecommerce-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  products: Product[] = [];
  searchTerm: string = '';
  items: Product[] = [];
  originalProducts: Product[] = [];
  selectedSortOption: string = "1";
  page = 1;
  pageSize = 8;
  added:boolean=false;
  constructor (
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private shoppingCartService: ShoppingCartService,
    
  ) { }

  ngOnInit(): void {
    this._fetchData();
 console.log("sort",this.selectedSortOption);
 
  }

  addToCart(productId: number): void {
    Swal.fire({
      title: 'Success',
      text: 'Product added to cart successfully!',
      icon: 'success',
    });
    
    const isProductInCart = this.shoppingCartService.getCartItems().some(item => item.id === productId);
  if (isProductInCart) {

    return;
  }
  
  this.productService.getProductById(productId).subscribe(product => {
    this.shoppingCartService.addToCart(product);
 
  });
  
  }

  editProduct(productId: number) {
    this.router.navigate(['/ecommerces/products/add-product', productId],{ relativeTo: this.route });
  }
  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          // Remove the deleted product from the local list
          this.products = this.products.filter(product => product.id !== productId);
          console.log('Product deleted successfully');
        },
        (error: any) => {
          console.error('Error deleting product', error);
        }
      );
    }
  }

  _fetchData(): void {
     this.productService.getAllProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
        this.originalProducts = [...this.products];
      },
      (error: any) => {
        console.error('Error fetching products', error);
      }
    );
  }



  /**
   * Search Method
  */
  searchData(searchTerm: string): void {
    if (searchTerm === '') {
      this._fetchData();
    }
    else {
      let updatedData = [...this.products];
      //  filter
      updatedData = updatedData.filter(product => product.name?.toLowerCase().includes(searchTerm));
      this.products = updatedData;
    }

  }

  getCartItemCount(): number {
    return this.shoppingCartService.getCartItems().length;
  }

  sortData(): void {
    const sortOption = this.selectedSortOption;
    
    if (sortOption === "1") {
      // Display all products
      this.products = [...this.originalProducts];
    } else if (sortOption === "2") {
      // Filter for products with low price
      const lowestPrice = Math.min(...this.originalProducts.map(product => product.price));
      this.products = this.originalProducts.filter(product => product.price === lowestPrice);
    } else if (sortOption === "3") {
      // Filter for products with high price
      const highestPrice = Math.max(...this.originalProducts.map(product => product.price));
      this.products = this.originalProducts.filter(product => product.price === highestPrice);
    } else if (sortOption === "4") {
      // Filter sold out products
      this.products = this.originalProducts.filter(product => product.stock === 0);
    }
  }
  
  
}
