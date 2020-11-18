import { Injectable } from '@angular/core';
// import { HttpParams } from '@angular/common/http';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Subscription } from '../models';
import { map } from 'rxjs/operators';


@Injectable()
export class SubscriptionService {
    constructor(
        private http: HttpClient,
        private apiService: ApiService
    ) { }

    query(): Observable<Subscription[]> {
        console.log(this.apiService.getlaravel('/subscription/'));
        return this.apiService.getlaravel('/subscription/').pipe(map(data =>data.data));
    }

    // getAwards(): Observable<Award[]> {
    //     return this.http.get<Award[]>(`http://localhost:3000/api/awards`);
    // }

    get(id): Observable<Subscription> {
        return this.apiService.getlaravel('/subscription/' + id).pipe(map(data => data.subscription));
    }

    destroy(id) {
        return this.apiService.deletelaravel('/subscription/' + id);
    }

    save(subscription): Observable<Subscription> {
        subscription={subscription}
        //para que funcion en laravel ya que la estructuras para añadir es asi:
        /*
        {
            "subscription": {
                "name": "modificado",
                "price": "99999"
            }
        }
        */
        
        console.log(subscription);
        if (subscription.id) {
            return this.apiService.putlaravel('/subscription/' + subscription.id, { subscription: subscription })
                .pipe(map(data => data.subscription));

        } else {
            return this.apiService.postlaravel('/subscription/', subscription )
                .pipe(map(data => data.subscription));
        }
    }


}