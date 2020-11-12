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
        console.log(this.apiService.get('/awards/'));
        return this.apiService.get('/awards/');
    }

    // getAwards(): Observable<Award[]> {
    //     return this.http.get<Award[]>(`http://localhost:3000/api/awards`);
    // }

    get(id): Observable<Award> {
        return this.apiService.get('/awards/' + id).pipe(map(data => data.award));
    }

    destroy(slug) {
        return this.apiService.delete('/awards/' + slug);
    }

    save(award): Observable<Award> {
        if (award.id) {
            return this.apiService.put('/awards/' + award.id, { award: award })
                .pipe(map(data => data.award));

        } else {
            return this.apiService.post('/awards/', { award: award })
                .pipe(map(data => data.award));
        }
    }


}