import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Award } from '../models';
import { map } from 'rxjs/operators';


@Injectable()
export class AwardsService {
    constructor(
        private apiService: ApiService
    ) { }

    query(): Observable<{ awards: Award[] }> {
        return this.apiService
            .get('/awards/').pipe(map(data => data.award));
    }

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