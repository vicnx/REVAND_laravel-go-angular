import { Component, Input, OnInit } from '@angular/core';
import { Award, AwardsService } from '../../core';
// import { User, UserService } from '../../core';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private awardsService: AwardsService,
    // private AllAwards: Award[]
    // private userService: UserService
  ) {
    
  }

//   currentUser: User;
@Input() 
all: Award[];
  ngOnInit() {
    console.log("ENTRA CTRL HEADER")
    this.awardsService.query().subscribe((awards) => {
      this.all =awards
      console.log(awards);
      // console.log(this.all);
      // console.log(this.AllAwards);
      console.log(awards);
    });
    // this.userService.currentUser.subscribe(
    //   (userData) => {
    //     this.currentUser = userData;
    //   }
    // );
  }
}
