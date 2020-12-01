import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['auth-modal.component.css']
})
export class AuthModalComponent implements OnInit {
  @Output()
  modal_auth_type: EventEmitter<any> = new EventEmitter<any>();
  isSubmitting = false;
  
  constructor() { }

  ngOnInit() {}

  loadLogin() {
    //hacemos un emit con el parametro login para despues capturarlo en el main-auth y cargar una vista u otra.
    this.modal_auth_type.emit('login');
  }

  loadRegister() {
    //hacemos un emit con el parametro register para despues capturarlo en el main auth y cargar una vista u otra.
    this.modal_auth_type.emit('register');
  }

  submitForm(event) {
    this.isSubmitting = true;
  }



  
}
