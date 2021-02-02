import { Component,OnInit, Input } from '@angular/core';
import { Product, ProductService,User,ProductListConfig } from '../../core';
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
    set author(author: User) {
        console.log(author);
        
    }
    
    @Input()
    set config(config: ProductListConfig) {
        if(config.type=="all"){
            this.runQuery();
        }else{
            console.log(config);
            // console.log(this.config.filters.author);
            this.runQuery(config);
        }
    }
    runQuery(config?){
        console.log("PRODUCT LIST COMPONENT");
        console.log(config);
        this.allProducts = [];
        this.productService.query(config).subscribe((products) => {
            console.log(products);
            this.allProducts = products;
        });
    }


    refresh(){
        this.runQuery()
    }
}