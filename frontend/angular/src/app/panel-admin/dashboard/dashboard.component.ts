import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';

// import { Subscription, SubscriptionService } from '../../core';

@Component({
  selector: 'app-dashboard-page',
  // styleUrls: ['./subscriptions.component.css'],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  constructor() {
    console.log("Dashboard.COMPONENT");
  }
  test = "all";

  ngOnInit() {
    console.log("Dashboard Component");
  }
}
