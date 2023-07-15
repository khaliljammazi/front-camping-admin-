import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';

import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-ecommerce-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  products: Product[] = [];
  searchTerm: string = '';
  page = 1;
  pageSize = 8;

  constructor (
    private productService: ProductService,  
  ) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Ecommerce', path: '/' }, { label: 'Products', path: '/', active: true }];
    this._fetchData();
  }

  /**
   * fetches product list
   */
  _fetchData(): void {
     this.productService.getAllProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
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


}
