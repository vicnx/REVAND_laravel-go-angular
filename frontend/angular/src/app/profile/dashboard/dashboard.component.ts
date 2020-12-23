import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService } from '../../core';


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
  test = "all";
  profile: User;
  currentUser: User;
  ngOnInit() {
    //recuperamos aqui tambien del resolve (de la url el user)
    this.route.data.subscribe(
      (data: { user: User }) => this.profile = data.user
    );
    this.userService.currentUser.subscribe(
      (userData)=> {
        this.currentUser = userData;

      }
    )
  }
}
