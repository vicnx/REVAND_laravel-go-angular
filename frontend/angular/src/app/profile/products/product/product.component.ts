import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {Award,AwardsService,} from '../../../core';

@Component({
  selector: 'app-award-details',
  templateUrl: './award.component.html'
})
export class AwardComponent implements OnInit {
  award: Award;
  // currentUser: User;
  // canModify: boolean;
  isDeleting = false;

  constructor(
    private route: ActivatedRoute,
    private awardsService: AwardsService,
    private router: Router,
    // private userService: UserService,
  ) { }

  ngOnInit() {
    // Retreive the prefetched article
    this.route.data.subscribe(
      (data: { award: Award }) => {
        console.log(data.award);
        this.award = data.award;
      }
    );

    // Load the current user's data
    // this.userService.currentUser.subscribe(
    //   (userData: User) => {
    //     this.currentUser = userData;

    //     this.canModify = (this.currentUser.username === this.article.author.username);
    //   }
    // );
  }

  deleteAward() {
    this.isDeleting = true;
    this.awardsService.destroy(this.award.id).subscribe(success => {
        this.router.navigateByUrl('/');
        console.log(this.award.id);
    });
  }

}
