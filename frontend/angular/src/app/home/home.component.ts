import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AwardsService } from '../core/' 
console.log(AwardsService);

// import { ArticleListConfig, TagsService, UserService } from '../core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private awardsService: AwardsService,
  ) {}

  awards: Array<string> = [];
  ngOnInit() {
    console.log("ng home init");

    this.awardsService.query().subscribe(awards => {
      console.log(awards);
      // this.awards = [];
      // this.tagsLoaded = true;
    });
  }
}
