import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {User,UserService,} from '../../../core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  user: User;
  // currentUser: User;
  // canModify: boolean;
  isDeleting = false;

  constructor(
    private route: ActivatedRoute,
    private usersService: UserService,
    private router: Router,
    // private userService: UserService,
  ) { }

  ngOnInit() {
    console.log("Dentro sub component");
    // Retreive the prefetched article
    this.route.data.subscribe(
      (data: { user: User }) => {
        console.log(data.user);
        this.user = data.user;
      }
    );
  }

  deleteUser() {
  //   this.isDeleting = true;
  //   this.usersService.destroy(this.user.id).subscribe(success => {
  //       this.router.navigateByUrl('/');
  //       console.log(this.user.id);
  //   });
  // }
  }
}
