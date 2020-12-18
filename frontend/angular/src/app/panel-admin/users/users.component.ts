import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { User, UserService } from '../../core';

@Component({
  selector: 'app-user-page',
  // styleUrls: ['./users.component.css'],
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  constructor() {
    console.log("Users.COMPONENT");
  }
  test = "all";

  ngOnInit() {
    console.log("Users Component");
  }
}
