import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService,ProductListConfig } from '../../core';


@Component({
  selector: 'dashboard-profile',
  styleUrls: ['./dashboard.component.css'],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  user: User;
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,


  ) {}
  config : ProductListConfig = {
    type:'notall',
    filters:{}
  };

  profile: User;
  currentUser: User;
  ngOnInit() {
    //recuperamos aqui tambien del resolve (de la url el user)
    this.route.data.subscribe(
      (data: { user: User }) => {
        this.profile = data.user
        this.config.filters.authorid = this.profile.id;
      }
    );
    this.userService.currentUser.subscribe(
      (userData)=> {
        this.currentUser = userData;

      }
    )
  }
}
