import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../models/product';
import * as filestack from 'filestack-js';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  filestackClient = filestack.init('AImPrCDnyQeifHkYOX3sLz');
  newProductForm: FormGroup;
  files: File[] = [];
  productId!: number;
  createdAt!:Date;
  modifiedAt!:Date
  isEdit: boolean = false;
  editMode: boolean = false;
  productImage: string = '';
  uploading: boolean = false; 
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.newProductForm = this.formBuilder.group({
      matricule: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      discount: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      vendingType: ['', Validators.required],
      active: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = +params['id'];
      if (productId) {
        // Perform actions for editing the product using the productId
        this.editMode = true;
        this.productId = productId;
        this.loadProduct(productId);
      } else {
        // Perform actions for adding a new product
        this.editMode = false;
        this.productId = 0; // Assign a default value if no product ID is provided
        // Clear form or initialize form values
        this.initializeForm();
      }
    });
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe(
      (product: Product) => {
        this.newProductForm.patchValue({
          matricule: product.matricule,
          name: product.name,
          description: product.description,
          discount: product.discount,
          price: product.price,
          stock: product.stock,
          vendingType: product.vendingType,
          active: product.active ? 'true' : 'false',
          image:product.image
         
        });
        //this.productImage = product.image;
      },
      (error: any) => {
        console.error('Error loading product', error);
      }
    );
  }
  
 
  
  saveProduct(): void {
    if (this.newProductForm.invalid) {
    
      
      return;
    }

    const product: Product = {
      id: this.productId,
      matricule: this.newProductForm.value.matricule,
      name: this.newProductForm.value.name,
      description: this.newProductForm.value.description,
      image: this.newProductForm.value.image,
      discount: this.newProductForm.value.discount,
      price: this.newProductForm.value.price,
      stock: this.newProductForm.value.stock,
      vendingType: this.newProductForm.value.vendingType,
      active: this.newProductForm.value.active,
    
    };

    if (this.editMode) {
      this.productService.updateProduct(this.productId, product).subscribe(
        (response: Product) => {
          Swal.fire({
            title: 'Success',
            text: 'Product updated successfully!',
            icon: 'success',
          });
          console.log('Product updated successfully', response);
          this.router.navigate(['admin/ecommerces/products']);
        },
        (error: any) => {
          console.error('Error updating product', error);
        }
      );
    } else {
      this.productService.addProduct(product).subscribe(
        (response: Product) => {
          Swal.fire({
            title: 'Success',
            text: 'Product added  successfully!',
            icon: 'success',
          });
          console.log('Product added successfully', response);
          this.router.navigate(['admin/ecommerces/products']);
        },
        (error: any) => {
          console.error('Error adding product', error);
        }
      );
    }
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    this.uploading = true; 
    this.files.forEach((file) => {
      this.filestackClient.upload(file)
        .then((result) => {
          console.log('Filestack upload result:', result);
          this.newProductForm.patchValue({ image: result.url });
          this.uploading = false; 
        })
        .catch((error) => {
          
          console.error('Filestack upload error:', error);
        });
    });
  }
  
  getPreviewUrl(file: File) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(encodeURI(URL.createObjectURL(file)));
  }

  getSize(f: File) {
    const bytes = f.size;
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  initializeForm() {
    // Clear form or initialize form values
    this.newProductForm.reset();
  }
}
