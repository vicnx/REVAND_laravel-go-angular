import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// import { Award, AwardsService } from '../../core';

@Component({
  selector: 'login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  isSubmitting = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {

    
  }
  

  submitForm(event) {
    this.isSubmitting = true;
    

  }

  hideModal(){
    let login = document.getElementById('modal-login-canvas');

    login.className = 'hide-modal';
  }

}
