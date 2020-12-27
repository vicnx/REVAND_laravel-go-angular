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
    // console.log("load ngoninit header");
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );
  }

  showAuth(){
    // console.log("login");
    let login = document.getElementById('modal-auth-canvas');
    login.className = 'active-modal';

  }
  logout(){
    this.userService.purgeAuth();
    location.reload();
  }
  adminpanel(){
    //al presionar el boton admin panel comprueba si el current user es admin o cliente, si es Admin envia el login a laravel y abre el panel admin
    if(this.currentUser.type != "admin"){
      console.log("Access denied");
      this.router.navigateByUrl('/');
    }else{
      this.userService.attemptAuthLaravel(this.currentUser.username).subscribe(
        data => {
          this.router.navigateByUrl('/admin-panel');
        }
      );
    }

  }
}
