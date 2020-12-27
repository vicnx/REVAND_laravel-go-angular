import { Component,OnInit, Input } from '@angular/core';
import { Product, ProductService } from '../../core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'app-product-list',
    styleUrls: ['product-list.component.css'],
    templateUrl: './product-list.component.html'
})

export class ProductListComponent{
    // isDeleting = false;
    allProducts: any;
    
    constructor (
        private productService: ProductService,
        private router: Router,
    ) {}

    @Input()
    set config(config: String) {
        if (config=="all") {
          this.runQuery();
        }
    }
    runQuery(){
        this.allProducts = [];
        this.productService.query().subscribe((products) => {
            // console.log(products);
            this.allProducts = products;
            // console.log(this.allProducts);
        });
    }
    refresh(){
        this.runQuery()
    }
}