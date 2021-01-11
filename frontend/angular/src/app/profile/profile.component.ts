import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService } from '../core';
import { Award, AwardsService } from '../core';

@Component({
  selector: 'app-profile-page',
  styleUrls: ['./profile.component.css'],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  user: User;
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  isSubmitting = false;
  profile: User;
  currentUser: User;
  ngOnInit() {
    // console.log("profile component");
    this.route.data.subscribe(
      (data: { user: User }) => {
        console.log(data.user);
        //guardamos en profile el usuario de la url (para enviarlo al sidebar)
        this.profile = data.user;
      }
    );
    this.userService.currentUser.subscribe(
      (userData)=> {
        this.currentUser = userData;
        // console.log(this.currentUser);
      }
    )
  }
}
