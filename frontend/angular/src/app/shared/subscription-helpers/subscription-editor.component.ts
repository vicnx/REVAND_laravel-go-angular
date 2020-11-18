import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription, SubscriptionService } from '../../core';

@Component({
  selector: 'app-editor-subscription',
  templateUrl: './subscription-editor.component.html',
  styleUrls: ['subscription-editor.component.css']
})
export class SubscriptionEditorComponent implements OnInit {
  @Output() refresh_list = new EventEmitter<string>();
  @Input() item: Subscription;
  subscription: Subscription = {} as Subscription;
  subscriptionForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;

  constructor(
    private subscriptionService: SubscriptionService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.subscriptionForm = this.fb.group({
      name: '',
      price:''
    });
  }

  ngOnInit() {
    console.log(this.item);

    this.route.data.subscribe((data: { subscription: Subscription }) => {
      if (data.subscription) {
        this.subscription = data.subscription;
        this.subscriptionForm.patchValue(data.subscription);
      }
    });
  }

  func() {
    console.log("DENTRO DE FUNC");
  }


  submitForm() {
    this.isSubmitting = true;
    this.getDataSubscription(this.subscriptionForm.value);
    console.log(this.subscription);

    this.subscriptionService.save(this.subscription).subscribe(
      subscription =>{
        //si se ha áñadido con exito envia un refresh al padre (para que actualize la lista)
        this.refresh_list.next(),
        //para limpiar los campos al añadir
        this.subscriptionForm = this.fb.group({
          name: '',
          price:''
        });
      }, 
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  getDataSubscription(values: Object) {
    Object.assign(this.subscription, values);
  }

}
