import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AwardsService } from '../core/';
import { Award,ProductListConfig } from '../core/' 
import { User, UserService } from '../core';


@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() awards;
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}
  config : ProductListConfig = {
    type:'all',
    filters:{}
  };
  currentUser: User;

  ngOnInit() {
    console.log("ng home init");
    // this.test = "test";

    this.userService.currentUser.subscribe(
      (userData)=> {
        this.currentUser = userData;
        console.log(this.currentUser);
      }
    )
  }
}
