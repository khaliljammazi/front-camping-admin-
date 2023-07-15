import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  product: Product = new Product();

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Ecommerce', path: '/' }, { label: 'Product Detail', path: '/', active: true }];

    this.route.queryParams.subscribe(params => {
      if (params && params.hasOwnProperty('id')) {
        const productId = Number(params['id']);
        this.productService.getProductById(productId).subscribe(
          (product: Product) => {
            this.product = product;
          },
          (error: any) => {
            console.error('Error fetching product details', error);
          }
        );
      }
    });
  }
  calculateDiscountedPrice(): number {
    const originalPrice = this.product.price;
    const discountPercentage = this.product.discount;

    const discountedPrice = originalPrice - (originalPrice * (discountPercentage / 100));
    return discountedPrice;
  }
}
