import { Component, EventEmitter, Input, OnInit, Output, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer} from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
  import { AuthModalComponent } from './auth-modal.component'

// import { Award, AwardsService } from '../../core';

@Component({
  selector: 'main-auth-modal',
  templateUrl: './main-auth-modal.component.html',
  styleUrls: ['main-auth-modal.component.css'],
})

export class MainAuthModalComponent implements OnInit {
  isSubmitting = false;
  modal_auth_type = 'auth'
  
  constructor(
  ) { }

  // La funcion se llama cuando al cambiar la clase del modal, entonces, se cambia el modal al valor por defecto ('auth')
  callback = (mutationsList, observer) => {
    let state = false;
    mutationsList.forEach(mutation => {
        if (mutation.attributeName === 'class') { state = true }
    })
    if (state) { this.set_auth_type('auth') }
  }

  ngOnInit() {
    this.modal_auth_type ='auth';
    const mainNode = document.getElementById('modal-auth-canvas');

    // Mutation Observer está a la espera de que ocurran cambios del Elemento DOM seleccionado (Modal Auth),
    // cuando hay, se llama a la función callback, la cual comprueba si ha han cambiado las clases.
    const mutationObserver = new MutationObserver(this.callback)
    mutationObserver.observe(mainNode, { attributes: true });
  }

  set_auth_type(event){
    // ponemos la variable modal_auth_type con el nombre del evento recogido de auth-modal
    this.modal_auth_type = event;
  }

  submitForm(event) {
    this.isSubmitting = true;
  }

  hideModal() {
    let auth = document.getElementById('modal-auth-canvas');

    auth.className = 'hide-modal';
  }

  
}
