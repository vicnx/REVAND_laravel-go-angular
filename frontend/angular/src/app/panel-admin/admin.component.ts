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
  isSubmitting = false;
  currentUser: User;
  
  ngOnInit() {

    //esta suscrito al cambio de usuario. comprueba si es admin o cliente, Si no es admin te vuelve al home. (no carga el admin panel.)
    this.userService.currentUser.subscribe(
      (userData)=> {
        this.currentUser = userData;
        console.log(this.currentUser);
        if(this.currentUser.type != "admin"){
          console.log("Access denied");
          this.router.navigateByUrl('/');
        }else{
          console.log("OKAYS Eres un mango");
        }
      }
    )
  }
}
