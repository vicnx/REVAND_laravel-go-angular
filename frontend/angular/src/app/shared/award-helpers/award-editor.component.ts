import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Award, AwardsService } from '../../core';

@Component({
  selector: 'app-editor-award',
  templateUrl: './award-editor.component.html',
  styleUrls: ['award-editor.component.css']
})
export class AwardEditorComponent implements OnInit {
  @Output() refresh_list = new EventEmitter<string>();
  // @Output() item = new EventEmitter<string>();
  @Input() item: Award;
  award: Award = {} as Award;
  awardForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;
  update = false;
  type = "Create"

  constructor(
    private awardsService: AwardsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.awardForm = this.fb.group({
      name: '',
      description: '',
      image: ''
    });
  }

  ngOnInit() {

    if (this.item){
      this.awardForm = this.fb.group({
        name: this.item.name,
        description: this.item.description,
        image: this.item.image
      });
      //ponemos la variable UPDATE a true para controlar cuando es un update
      this.update=true;
      //sobreescribimos award con el item del binding (si lo tiene claro)
      this.award =this.item
      this.type="Update";
    }else{
      //si no tiene item pone los campos del editor vacios. (create)
      this.awardForm = this.fb.group({
        name: '',
        description: '',
        image: ''
      });
    }
  }
  

  submitForm(event) {
    this.isSubmitting = true;
    this.getDataAward(this.awardForm.value);
    console.log(this.award);
    console.log(event);

    if (!this.award.image) this.award.image = 'null';

    if (this.update){
      //esto oculta el editor cuando finalizas la edicion
      let node = event.target;
      let editor = node.parentNode.parentNode.parentNode.parentNode;
      let parent = editor.parentNode
      let btn = parent.querySelector('.oppened');
      btn.classList.remove('oppened');
      editor.style.display = 'none';
    }
    this.awardsService.save(this.award).subscribe(
      award =>{
        //si se ha áñadido con exito envia un refresh al padre (para que actualize la lista)
        this.refresh_list.next(),
        
        //volvemos a llamar a ngoninit para que actualize los datos del update o del create
        this.ngOnInit();

      },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );

  }

  getDataAward(values: Object) {
    console.log(this.award);
    Object.assign(this.award, values);
  }

}
