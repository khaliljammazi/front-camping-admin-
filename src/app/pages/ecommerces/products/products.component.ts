import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Product } from 'src/app/models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ecommerce-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  selectedProducts: number[] = [];
  searchTerm: string = '';
  items: Product[] = [];
  originalProducts: Product[] = [];
  selectedSortOption: string = "1";
  page = 1;
  pageSize = 8;
  loading: boolean = false;
  selectAll: boolean = false;
  products: Product[] = [];
  columns: Column[] = [];
  @ViewChild('advancedTable') advancedTable: any;
  constructor (
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private shoppingCartService: ShoppingCartService,
   
  ) { }

  ngOnInit(): void {
    this._fetchData();
    this.initAdvancedTableData();
  }

  initAdvancedTableData(): void {
    this.columns = [
      {
        name: 'name',
        label: 'Product',
        formatter: this.productimageFormatter.bind(this)
      },
      {
        name: 'id',
        label: 'id',
        formatter: (product:Product) => product.id
      },
      {
        name: 'Product',
        label: ' Name',
        formatter: (product:Product) => product.name
      },
      {
        name: 'matricule',
        label: 'Matricule',
        formatter: (product:Product) =>product.matricule
      },
      {
        name: 'price',
        label: ' price',
        formatter: (product:Product) =>product.price
      },
      {
        name: 'discount',
        label: 'Discount',
        formatter: (product:Product) => product.discount
      },
      {
        name: 'description',
        label: 'Description',
        formatter: (product:Product) => product.description
      },
      {
        name: 'stock',
        label: 'Stock',
        formatter: (product:Product) => product.stock
      },
     
      {
        name: 'created_on',
        label: 'Created Date',
        formatter: (product:Product) => this.formatDate(product.createdAt)
      },
      {
        name: 'edit_on',
        label: 'updated Date',
        formatter: (product:Product) =>  this.formatDate(product.modifiedAt)

      },
    ];
  }


  productimageFormatter(product:Product): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      `
      <div class="table-user">
      <img src="${product.image}" alt="table-user" class="me-2 rounded-circle">

       </div>
      `
    );
  }
    
  editProduct(productId: number) {
    this.router.navigate(['/admin/ecommerces/products/add-product', productId],{ relativeTo: this.route });
  }

  deleteProduct(productId: number): void {
    Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(productId).subscribe(
          () => {
            this.products = this.products.filter(product => product.id !== productId);
            Swal.fire({
              title: 'Success',
              text: 'Product deleted successfully!',
              icon: 'success'
            });
            console.log('Product deleted successfully');
          },
          (error: any) => {
            Swal.fire({
              title: 'Error',
              text: 'Error deleting product',
              icon: 'error'
            });
            console.error('Error deleting product', error);
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Deletion canceled',
          text: 'The deletion operation was canceled.',
          icon: 'info'
        });
      }
    });
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

 

  getCartItemCount(): number {
    return this.shoppingCartService.getCartItems().length;
  }

  formatDate(date:Date|undefined): any {
    return moment(date).format('DD/MM/YYYY');
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
