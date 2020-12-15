import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../core';

@Component({
  selector: 'login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['login-modal.component.css']
})
export class LoginModalComponent implements OnInit {
  @Output()
  modal_auth_type: EventEmitter<any> = new EventEmitter<any>();
  isSubmitting = false;
  loginForm: FormGroup;
  
  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    this.loginForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
       

  }

  ngOnInit() {

  }


  go_back() {
    console.log("GOBACK");
    this.modal_auth_type.emit('auth');
  }

  close() {
    let auth = document.getElementById('modal-auth-canvas');
    auth.className = 'hide-modal';
  }

  loginSubmit() {
    this.isSubmitting = true;
    const user_data = this.loginForm.value;
    console.log(this.loginForm.value)
    this.userService.attemptAuth('login', user_data).subscribe(
      data => {
        location.reload();
      },
      err => {
        console.log("error");
        // this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

}

