import { Component, Input, OnInit } from '@angular/core';
import { User, UserService } from '../../core';


@Component({
  selector: 'profile-layout-sidebar',
  templateUrl: './profile-sidebar.component.html',
  styleUrls: ['./profile-sidebar.component.css']
})
export class SidebarProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
  ) {}
  ngOnInit() {}

  logout(){
    this.userService.purgeAuth();
    location.reload();
  }

}
