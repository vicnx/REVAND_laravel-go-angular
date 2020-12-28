import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';


import {Product,ProductService} from '../../../core';

@Component({
  selector: 'app-editor-product-details',
  templateUrl: './editor-product.component.html'
})
export class EditorProductComponent implements OnInit {
  product: Product = {} as Product;
  productForm: FormGroup;
  // currentUser: User;
  // canModify: boolean;
  isDeleting = false;
  isSubmitting = false;
  update = false;
  errors: Object = {};

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder
    // private userService: UserService,
  ) 
  {
    this.productForm = this.fb.group({
      Name: '',
      Description: '',
      Images: '',
      Price: ''
    });
  }

  ngOnInit() {
    this.route.data.subscribe(
      (data: { product: Product }) => {
        if (data.product) {
          this.update = true;
          this.product = data.product;
          this.productForm.patchValue(data.product);
        }
      }
    );
  }

  submitForm() {
    this.isSubmitting = true;
    this.getDataProduct(this.productForm.value);
    this.productService.save(this.product).subscribe(
      product => this.router.navigateByUrl('/products/'+this.product.Slug),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  getDataProduct(values: Object) {
    console.log(values);
    Object.assign(this.product, values);
  }


}
