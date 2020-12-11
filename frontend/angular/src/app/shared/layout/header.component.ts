import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User, UserService } from '../../core';
import { Subscription, SubscriptionService } from '../../core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private subscriptionService: SubscriptionService,
  ) {}
  currentUser: User;
  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
        console.log(this.currentUser);
      }
    );
  }

  showAuth(){
    console.log("login");
    let login = document.getElementById('modal-auth-canvas');
    login.className = 'active-modal';

  }

  logout(){
    this.userService.purgeAuth();
    location.reload();
  }
  adminpanel(){
    // console.log(this.currentUser);
    // this.userService.attemptAuthLaravel(this.currentUser.username).subscribe((data) => {
    //         console.log(data);
    // })

    // console.log(this.currentUser);
  }
}
