import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User, UserService } from '../../core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService
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
    // if (login.classList.contains('hide-modal')) {
    // let auth = document.getElementById('modal-auth');
    // }
    login.className = 'active-modal';

    // auth.className = "modal active-modal"

  }

  logout(){
    this.userService.purgeAuth();
    location.reload();
  }
}
