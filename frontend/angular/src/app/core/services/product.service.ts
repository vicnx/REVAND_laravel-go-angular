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

    // get(id): Observable<Product> {
    //     return this.apiService.getlaravel('/subscription/' + id).pipe(map(data => data.subscription));
    // }

    // destroy(id) {
    //     return this.apiService.deletelaravel('/subscription/' + id);
    // }

    // save(subscription): Observable<Product> {
    //     subscription={subscription}
        
    //     console.log(subscription.subscription);
    //     if (subscription.subscription.id) {
    //         return this.apiService.putlaravel('/subscription/' + subscription.subscription.id, subscription )
    //             .pipe(map(data => data.subscription));
    //     } else {
    //         return this.apiService.postlaravel('/subscription/', subscription )
    //             .pipe(map(data => data.subscription));
    //     }
    // }


}