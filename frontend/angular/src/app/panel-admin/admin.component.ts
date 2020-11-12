import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Award, AwardsService } from '../core';

@Component({
  selector: 'app-admin-page',
  styleUrls: ['./admin.component.css'],
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
    console.log("Admin Component");
  }
}
