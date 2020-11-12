import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AwardsService } from '../core/';
import { Award } from '../core/' 

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() awards;
  constructor(
    private router: Router,
  ) {}
  test = "all";

  ngOnInit() {
    console.log("ng home init");
    // this.test = "test";
  }
}
