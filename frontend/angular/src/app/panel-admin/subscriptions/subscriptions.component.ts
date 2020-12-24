import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';

// import { Subscription, SubscriptionService } from '../../core';

@Component({
  selector: 'app-subscription-page',
  // styleUrls: ['./subscriptions.component.css'],
  templateUrl: './subscriptions.component.html'
})
export class SubscriptionsComponent implements OnInit {
  constructor() {
    console.log("Subscriptions.COMPONENT");
  }
  test = "all";

  ngOnInit() {
    console.log("Subscriptions Component");
  }
}
