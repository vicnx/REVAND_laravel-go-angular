import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable ,  throwError } from 'rxjs';

import { JwtService } from './jwt.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) {}

  private formatErrors(error: any) {
    return  throwError(error.error);
  }


  // ---------------------------- GO --------------------------------------

  /*-----------------------example USE (POST)-----------------------------
  this.api.post("/user/",'users',body)
  "/redis/" -> path
  'redis' -> api_url to use (ALWAYS AFTER THE PATH)
  body -> for example a user to insert
  -------------------------------------------------------------------------*/
  
  get(path: string, api: string, params?:HttpParams): Observable<any> {
    //para recoger la API enviada.
    let x = "api_go_"+api;
    // console.log("pepepepepepe");
    environment[x]; //environment.api_go_users (example)
    // console.log(`${environment[x]}${path}`);
    console.log("PARAMS API SERVICE");
    console.log(params);
    return this.http.get(`${environment[x]}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }


  put(path: string,api: string, body: Object = {}): Observable<any> {
    //para recoger la API enviada.
    let x = "api_go_"+api;
    environment[x]; //environment.api_go_users (example)
    return this.http.put(
      `${environment[x]}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string,api: string, body: Object = {}): Observable<any> {
    let x = "api_go_"+api;
    environment[x]; //environment.api_go_users (example)
    console.log(`${environment[x]}${path}`);
    return this.http.post(
      `${environment[x]}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  delete(path:string,api:string): Observable<any> {
    let x = "api_go_"+api;
    environment[x]; //environment.api_go_users (example)
    console.log(path);
    return this.http.delete(
      `${environment[x]}${path}`
    ).pipe(catchError(this.formatErrors));
  }

  //-----------------------------laravel---------------------------
  getlaravel(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url_laravel}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  putlaravel(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url_laravel}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  postlaravel(path: string, body: Object = {}): Observable<any> {
    // console.log(environment.api_url_laravel);
    return this.http.post(
      `${environment.api_url_laravel}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }
  
  deletelaravel(path): Observable<any> {
    return this.http.delete(
      `${environment.api_url_laravel}${path}`
    ).pipe(catchError(this.formatErrors));
  }

  
}
