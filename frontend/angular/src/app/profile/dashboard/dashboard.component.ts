import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'dashboard-profile',
  styleUrls: ['./dashboard.component.css'],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  constructor() {
    console.log("dashboard COMPONENT");
  }
  test = "all";

  ngOnInit() {
    console.log("Dashboard Component");
  }
}
