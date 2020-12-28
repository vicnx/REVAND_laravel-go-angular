import { Injectable } from '@angular/core';
// import { HttpParams } from '@angular/common/http';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Product } from '../models';
import { map } from 'rxjs/operators';


@Injectable()
export class ProductService {
    constructor(
        private http: HttpClient,
        private apiService: ApiService
    ) { }

    query(): Observable<Product[]> {
        return this.apiService.get('/products/','products')
        .pipe(map(
          data => { return data },
          err => console.log(err)
        ));    
    }

    get(slug): Observable<Product> {
        return this.apiService.get('/products/'+slug,'products').pipe(map(data => data));
    }

    // destroy(id) {
    //     return this.apiService.deletelaravel('/product/' + id);
    // }

    save(product): Observable<Product> {
        // product={product}
        
        console.log(product);
        if (product._id) {
            return this.apiService.put('/products/' + product.id,'products', product )
                .pipe(map(data => data.product));
        } else {
            return this.apiService.post('/products/','products', product )
                .pipe(map(data => data.product));
        }
    }


}