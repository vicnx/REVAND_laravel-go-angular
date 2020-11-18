import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Subscription, SubscriptionService } from '../../../core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class SubscriptionResolver implements Resolve<Subscription> {
  constructor(
    private subscriptionService: SubscriptionService,
    private router: Router,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.subscriptionService.get(route.params['id'])
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
  }
}
