import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService } from '../../core';
import {ProfileResolver} from './../profile-resolver.service';



@Component({
  selector: 'profile-layout-sidebar',
  templateUrl: './profile-sidebar.component.html',
  styleUrls: ['./profile-sidebar.component.css']
})
export class SidebarProfileComponent implements OnInit {
  @Input() profile: User;
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  currentUser: User;
  checkCurrentUser: boolean;
  ngOnInit() {
    this.checkCurrentUser= false; //True if the current user is the same that the obtained by bbdd
    this.userService.currentUser.subscribe(
      (userData)=> {
        this.currentUser = userData
        console.log(this.currentUser.username);
        console.log(this.profile.username);
        if (this.currentUser.username == this.profile.username) {
          this.checkCurrentUser = true;
        }
      }
    )
  }

  ngOnChanges() {
    if (this.currentUser.username == this.profile.username) {
      this.checkCurrentUser = true;
    }
  }

  

  logout(){
    this.userService.purgeAuth();
    location.reload();
  }
}

