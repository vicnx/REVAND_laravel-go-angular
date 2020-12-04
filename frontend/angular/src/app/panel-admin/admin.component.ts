import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService } from '../core';
import { Award, AwardsService } from '../core';

@Component({
  selector: 'app-admin-page',
  styleUrls: ['./admin.component.css'],
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}
  currentUser: User;
  
  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;

        if(this.currentUser.type != "admin"){
          this.router.navigateByUrl('/');
        }else{
          
        }
      }
    );
    console.log("Admin Component");
  }
}
