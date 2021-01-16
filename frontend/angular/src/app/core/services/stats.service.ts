import { Injectable } from '@angular/core';
// import { HttpParams } from '@angular/common/http';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable ,  throwError } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { environment, environment_stats } from '../../../environments/environment';
import { ApiService } from './api.service';



@Injectable()
export class StatsService {
    constructor(
        private http: HttpClient,
        private apiService: ApiService,
    ) { }

    private formatErrors(error: any) {
        return  throwError(error.error);
    }

    //get stats go endpoints
    getStats(type): Observable<any> {
        return this.apiService.get('/stats/', type)
        .pipe(map(
            data => { return data },
            err => console.log(err)
        ));
    }
}