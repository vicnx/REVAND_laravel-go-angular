import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../core';


@Component({
  selector: 'register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['register-modal.component.css'],
})
export class RegisterModalComponent implements OnInit {
  @Output()
  modal_auth_type: EventEmitter<any> = new EventEmitter<any>();
  isSubmitting = false;
  registerForm: FormGroup;
  
  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    this.registerForm = this.fb.group({
      'username': ['', Validators.required],
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

  registerSubmit() {
    this.isSubmitting = true;
    const user_data = this.registerForm.value;
    this.userService.attemptAuth('register', user_data).subscribe(
      data => {
        location.reload();
      },
      err => {
        console.log("Error register submit");
        this.isSubmitting = false;
      }
    );
  }

}
