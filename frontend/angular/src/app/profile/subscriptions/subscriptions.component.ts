import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'subscriptions-profile',
  styleUrls: ['./subscriptions.component.css'],
  templateUrl: './subscriptions.component.html'
})
export class SubscriptionsComponent implements OnInit {
  constructor() {
    console.log("subs COMPONENT");
  }
  config = "all";

  ngOnInit() {
    console.log("subs Component");
  }
}
