import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Award, AwardsService } from '../../core';

@Component({
  selector: 'app-awards-page',
  styleUrls: ['./awards.component.css'],
  templateUrl: './awards.component.html'
})
export class AwardsComponent implements OnInit {
  constructor() {
    console.log("AWARDS.COMPONENT");
  }
  test = "all";

  ngOnInit() {
    console.log("Awards Component");
  }
}
