import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription, SubscriptionService, NotificationService } from '../../core';

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
  update = false;
  type = "Create"

  constructor(
    private subscriptionService: SubscriptionService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private notification: NotificationService,

  ) {
    this.subscriptionForm = this.fb.group({
      name: '',
      price:''
    });
  }

  ngOnInit() {
    if (this.item){
      this.subscriptionForm = this.fb.group({
        name: this.item.name,
        price: this.item.price,
      });
      //ponemos la variable UPDATE a true para controlar cuando es un update
      this.update=true;
      //sobreescribimos subscription con el item del binding (si lo tiene claro)
      this.subscription =this.item
      this.type="Update";
    }else{
      //si no tiene item pone los campos del editor vacios. (create)
      this.subscriptionForm = this.fb.group({
        name: '',
        price: ''
      });
    }

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


  submitForm(event) {
    this.isSubmitting = true;
    this.getDataSubscription(this.subscriptionForm.value);
    console.log(this.subscription);
    if (this.update){
      //esto oculta el editor cuando finalizas la edicion
      let node = event.target;
      let editor = node.parentNode.parentNode.parentNode.parentNode;
      let parent = editor.parentNode
      let btn = parent.querySelector('.oppened');
      btn.classList.remove('oppened');
      editor.style.display = 'none';
    }
    this.subscriptionService.save(this.subscription).subscribe(
      subscription =>{
        this.notification.showSuccess(this.type+" con exito", "Success")
        //si se ha áñadido con exito envia un refresh al padre (para que actualize la lista)
        this.refresh_list.next(),
        //para limpiar los campos al añadir
        this.ngOnInit();
      }, 
      err => {
        this.notification.showError(this.type+" ha fallado", "Error")
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  getDataSubscription(values: Object) {
    Object.assign(this.subscription, values);
  }

}
