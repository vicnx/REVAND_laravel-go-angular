import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Product, ProductService } from '../../../core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ProductResolver implements Resolve<Product> {
  constructor(
    private productsService: ProductService,
    private router: Router,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.productsService.get(route.params['id'])
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
  }
}
