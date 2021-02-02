import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserList, User,UserService,ProductListConfig } from '../../core';
import { catchError } from 'rxjs/operators';



@Component({
  selector: 'products-profile',
  styleUrls: ['./products.component.css'],
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    
    // console.log("products COMPONENT");
  }

  user: User;
  config : ProductListConfig = {
    type:'all',
    filters:{}
  };
  profile_username: any;
  profile: any;
  currentUser: User;

  ngOnInit() {

  }
}
