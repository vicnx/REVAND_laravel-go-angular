import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {Subscription,SubscriptionService,} from '../../../core';

@Component({
  selector: 'app-subscription-details',
  templateUrl: './subscription.component.html'
})
export class SubscriptionComponent implements OnInit {
  subscription: Subscription;
  // currentUser: User;
  // canModify: boolean;
  isDeleting = false;

  constructor(
    private route: ActivatedRoute,
    private subscriptionsService: SubscriptionService,
    private router: Router,
    // private userService: UserService,
  ) { }

  ngOnInit() {
    console.log("Dentro sub component");
    // Retreive the prefetched article
    this.route.data.subscribe(
      (data: { subscription: Subscription }) => {
        console.log(data.subscription);
        this.subscription = data.subscription;
      }
    );
  }

  deleteSubscription() {
    this.isDeleting = true;
    this.subscriptionsService.destroy(this.subscription.id).subscribe(success => {
        this.router.navigateByUrl('/');
        console.log(this.subscription.id);
    });
  }

}
