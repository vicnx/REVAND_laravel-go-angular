import { Injectable } from '@angular/core';
// import { HttpParams } from '@angular/common/http';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Award } from '../models';
import { map } from 'rxjs/operators';


@Injectable()
export class AwardsService {
    constructor(
        private http: HttpClient,
        private apiService: ApiService
    ) { }

    query(): Observable<Award[]> {
        console.log(this.apiService.getlaravel('/award/'));
        return this.apiService.getlaravel('/award/');
    }

    // getAwards(): Observable<Award[]> {
    //     return this.http.get<Award[]>(`http://localhost:3000/api/awards`);
    // }

    get(id): Observable<Award> {
        return this.apiService.getlaravel('/award/' + id).pipe(map(data => data.award));
    }

    destroy(slug) {
        return this.apiService.deletelaravel('/award/' + slug);
    }

    save(award): Observable<Award> {
        console.log("DENTRO DE SAVE SERVICE");
        award= {award}
        // console.log(award);
        if (award.award.id) {
            // console.log(award.award.id);
            return this.apiService.putlaravel('/award/' + award.award.id, award )
                .pipe(map(data => data.award));

        } else {
            return this.apiService.postlaravel('/award/', award )
                .pipe(map(data => data.award));
        }
    }


}