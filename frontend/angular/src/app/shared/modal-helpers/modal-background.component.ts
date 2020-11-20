import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// import { Award, AwardsService } from '../../core';

@Component({
  selector: 'login-modal',
  templateUrl: './award-editor.component.html',
  styleUrls: ['award-editor.component.css']
})
export class ModalBackgroundComponent implements OnInit {

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

}
