import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor() {}
  ngOnInit() {
    
  }

  showLogin(){
    console.log("login");
    let login = document.getElementById('modal-login-canvas');
    // if (login.classList.contains('hide-modal')) {
    let auth = document.getElementById('modal-login');
    // }
    login.className = 'active-modal';

    auth.className = "modal-login active-modal"

  }
}
