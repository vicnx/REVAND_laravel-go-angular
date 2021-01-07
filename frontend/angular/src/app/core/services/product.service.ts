import { Injectable } from '@angular/core';
// import { HttpParams } from '@angular/common/http';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { from, Observable } from 'rxjs';

import { ApiService } from './api.service';
import { UserService} from './user.service';
import { Product } from '../models';

import { map } from 'rxjs/operators';
import {User, Profile} from './../models'


@Injectable()
export class ProductService {
    constructor(
        private http: HttpClient,
        private apiService: ApiService,
        private userService: UserService
    ) { }
        
    query(): Observable<Product[]> {
        return this.apiService.get('/products/','products')
        .pipe(map(
          data => { return data },
          err => console.log(err)
        ));    
    }

    get(slug): Observable<Product> {
        return this.apiService.get('/products/'+slug,'products').pipe(map( (data) => {
            this.userService.GetUserByID(data.AuthorID).subscribe( (Author: Profile) => data.Author = Author);
            return data
        } ));
    }

    // get(slug): Observable<Product> {
    //     return this.apiService.get('/products/'+slug,'products').pipe(map( (data) => {
    //         data.Author = async () => {
    //             let Authorr;
    //             await this.userService.GetUserByID(data.AuthorID).subscribe( async (Author: Profile) => Authorr = Author);
    //             return Authorr
    //         }
    //         return data
    //     } ));
    // }

    getWithAuthor(slug) {
        return this.get(slug).subscribe( async (Product: Product) => {
            await this.userService.GetUserByID(Product.AuthorID).subscribe( (Author: Profile) => Product.Author = Author);
            return Product
        });
    }

    save(product): Observable<Product> {
        // product={product}
        if (product._id) {
            return this.apiService.put('/products/' + product.Slug,'products', product )
                .pipe(map(data => data.product));
        } else {
            return this.apiService.post('/products/','products', product )
                .pipe(map(data => data.product));
        }
    }

    destroy(slug) {
        return this.apiService.delete('/products/' + slug,'products');
    }


}