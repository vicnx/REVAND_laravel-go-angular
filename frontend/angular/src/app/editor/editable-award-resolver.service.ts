import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Award, AwardsService} from '../core';
import { catchError ,  map } from 'rxjs/operators';

@Injectable()
export class EditableAwardResolver implements Resolve<Award> {
  constructor(
    private awardsService: AwardsService,
    private router: Router,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.awardsService.get(route.params['slug'])
      .pipe(
        map(
          award => {
            return award;
            // if (this.userService.getCurrentUser().username === article.author.username) {
            //   return article;
            // } else {
            //   this.router.navigateByUrl('/');
            // }
          }
        ),
        catchError((err) => this.router.navigateByUrl('/'))
      );
  }
}
