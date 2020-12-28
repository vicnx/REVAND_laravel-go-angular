import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Product, ProductService, } from '../../../core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  product: Product;
  // currentUser: User;
  // canModify: boolean;
  isDeleting = false;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductService,
    private router: Router,
    // private userService: UserService,
  ) { }

  images: Array<object>  = [
      {path: 'https://image.api.playstation.com/cdn/EP0001/CUSA05847_00/6SOISQ9M0FkHf52a4iHcO5OLDKMtjzhj.png'},
      {path: 'https://image.api.playstation.com/cdn/EP0001/CUSA05847_00/6SOISQ9M0FkHf52a4iHcO5OLDKMtjzhj.png'},
      {path: 'https://image.api.playstation.com/cdn/EP0001/CUSA05847_00/6SOISQ9M0FkHf52a4iHcO5OLDKMtjzhj.png'},
  ]

  imageObject: Array<object> = [
    {
      image: 'https://image.api.playstation.com/cdn/EP0001/CUSA05847_00/6SOISQ9M0FkHf52a4iHcO5OLDKMtjzhj.png',
      thumbImage: 'https://image.api.playstation.com/cdn/EP0001/CUSA05847_00/6SOISQ9M0FkHf52a4iHcO5OLDKMtjzhj.png',
      alt: 'alt of image',
      title: 'title of image'
    },
    {
      image: 'https://image.api.playstation.com/cdn/EP0001/CUSA05847_00/6SOISQ9M0FkHf52a4iHcO5OLDKMtjzhj.png',
      thumbImage: 'https://image.api.playstation.com/cdn/EP0001/CUSA05847_00/6SOISQ9M0FkHf52a4iHcO5OLDKMtjzhj.png',
      alt: 'alt of image',
      title: 'title of image'
    },
    {
      image: 'https://image.api.playstation.com/cdn/EP0001/CUSA05847_00/6SOISQ9M0FkHf52a4iHcO5OLDKMtjzhj.png',
      thumbImage: 'https://image.api.playstation.com/cdn/EP0001/CUSA05847_00/6SOISQ9M0FkHf52a4iHcO5OLDKMtjzhj.png',
      alt: 'alt of image',
      title: 'title of image'
    }
  ];

  ngOnInit() {

    console.log("DENTRO DE COMPONENT DETAILS PRODUCT =======");

    // Retreive the prefetched article
    this.route.data.subscribe(
      (data: { product: Product }) => {
        console.log(data.product);
        this.product = data.product;
      }
    );

    // Load the current user's data
    // this.userService.currentUser.subscribe(
    //   (userData: User) => {
    //     this.currentUser = userData;

    //     this.canModify = (this.currentUser.username === this.article.author.username);
    //   }
    // );
  }

  // deleteProduct() {
  //   this.isDeleting = true;
  //   this.productsService.destroy(this.product.id).subscribe(success => {
  //       this.router.navigateByUrl('/');
  //       console.log(this.product.id);
  //   });
  // }

}
