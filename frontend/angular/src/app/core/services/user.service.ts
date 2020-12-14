import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { RedisService } from './redis.service';

import { User } from '../models';
import { map, distinctUntilChanged } from 'rxjs/operators';


@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private redisService: RedisService,
    private http: HttpClient,
    private jwtService: JwtService
  ) { }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    console.log("POPULATE");
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get('/user/').subscribe(
        data => {
          
          this.setAuth(data.user)
        },
        err => this.purgeAuth()
      );
    } else {
      console.log("purge auth");
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }

    // if (this.jwtService.getTokenLaravel()) {
    //   this.apiService.getlaravel('/user/').subscribe(
    //     data => {
    //       this.setAuth(data.user)
    //     },
    //     err => this.purgeAuth()
    //   );
    // } else {
    //   console.log("purge auth");
    //   // Remove any potential remnants of previous auth states
    //   this.purgeAuth();
    // }
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
    this.redisService.set({ key: "user_" + user.username, value: "Token " + user.token });
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type, credentials): Observable<User> {
    const route = (type === 'login') ? 'login' : '';
    return this.apiService.post('/users/' + route, { user: credentials })
      .pipe(map(
        data => {
          // console.log('attemptAuth')
          this.setAuth(data.user);
          // this.sendloginlaravel(data.user.username);
          return data;
        }
      ));
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  // Update the user on the server (email, pass, etc)
  update(user): Observable<User> {
    return this.apiService
      .put('/user/', { user })
      .pipe(map(data => {
        // Update the currentUser observable
        this.currentUserSubject.next(data.user);
        return data.user;
      }));
  }


  // LARAVEL SERVICES AUTH (LARAVEL ONLY ADMINS)

  attemptAuthLaravel(username): Observable<User> {
    console.log(username);
    console.log("DENTRO DE SEND LOGIN LARAVEL");
    //deslogeamos para poder reemplazar el token (guardar el de laravel)
    this.purgeAuth();
    console.log(this.apiService);
    //enviamos a laravel
    return this.apiService.postlaravel('/admin-login/', { username })
      .pipe(map(
        data => {
          //logeamos con la info de laravel
          this.setAuth(data.user);
          return data
        },
        err => console.log(err)
      ));
  }

  // setAuthLaravel(user: User) {
  //   // Save JWT sent from server in localstorage
  //   this.jwtService.saveTokenLaravel(user.token);
  //   // Set current user data into observable
  //   // this.currentUserSubject.next(user);
  //   console.log(user);
  //   // user['laravelToken'] =
  //   // this.currentUserSubject.next(user);
  //   // this.currentUser.laravelToken = user.token;
  //   // Set isAuthenticated to true
  //   this.isAuthenticatedSubject.next(true);
  // }

  // purgeAuthLaravel() {
  //   // Remove JWT from localstorage
  //   this.jwtService.destroyTokenLaravel();
  //   // Set current user to an empty object
  //   this.currentUserSubject.next({} as User);
  //   // Set auth status to false
  //   this.isAuthenticatedSubject.next(false);
  // }
}
