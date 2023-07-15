import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import * as filestack from 'filestack-js';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']

})

export class AddProductComponent implements OnInit {
 

  ngOnInit(): void {
   
  }

  
}
