import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// import { ArticleListConfig, TagsService, UserService } from '../core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
  ) {}
  ngOnInit() {
    console.log("ng home init");
  }
}
