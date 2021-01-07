import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService, Profile } from '../../core';
import { ProfileResolver } from './../profile-resolver.service';



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
  ) { }
  // profile_user: Profile;
  currentUser: User;
  checkCurrentUser: boolean;
  ngOnInit() {
    this.checkCurrentUser = false; //True if the current user is the same that the obtained by bbdd
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
        console.log(this.profile);
        if (this.currentUser.username == this.profile.username) {
          this.checkCurrentUser = true;
        }
      }
    )
  }

  ngOnChanges() {
    if (this.currentUser) {
      if (this.currentUser.username == this.profile.username) {
        this.checkCurrentUser = true;
      }
    }
  }

  followUser(event){
    this.userService.follow(this.profile.username).subscribe()
    this.profile.following = true
  }

  unfollowUser(event){
    this.userService.unfollow(this.profile.username).subscribe()
    this.profile.following = false
  }

  logout() {
    this.userService.purgeAuth();
    location.reload();
  }
}

