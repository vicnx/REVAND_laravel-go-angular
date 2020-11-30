import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// import { Award, AwardsService } from '../../core';

@Component({
  selector: 'register-modal',
  templateUrl: './register-modal.component.html',
//   styleUrls: ['register-modal.component.css']
})
export class RegisterModalComponent implements OnInit {

  isSubmitting = false;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {

  }

  loadLogin() {
    let modal = document.getElementById('modal-auth-canvas');
    let auth = modal.querySelector('#modal-auth');
    console.log("LOGIN LOAD");
    // let auth = document.getElementById('modal-auth');
    auth.className = 'hide-modal';
    // load modalregister <3


    //esto carrega el form de login
  }

  loadRegister() {
    let modalAuth = document.getElementById('modal-auth-canvas');
    let modalRegister = document.getElementById('modal-register-canvas');
    // let auth = modalAuth.querySelector('#modal-auth');
    console.log("REGISTER LOAD");
    modalAuth.className = 'hide-modal';
    //esto carrega el form de register
  }

  submitForm(event) {
    this.isSubmitting = true;
  }

  hideModal() {
    let auth = document.getElementById('modal-auth-canvas');

    auth.className = 'hide-modal';
  }

  
}
