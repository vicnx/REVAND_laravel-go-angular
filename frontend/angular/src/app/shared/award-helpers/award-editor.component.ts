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
  @Input() item: Award;
  award: Award = {} as Award;
  awardForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;

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
    console.log(this.item);

    this.route.data.subscribe((data: { award: Award }) => {
      if (data.award) {
        this.award = data.award;
        this.awardForm.patchValue(data.award);
      }
    });
  }

  func() {
    console.log("DENTRO DE FUNC");
  }


  submitForm() {
    this.isSubmitting = true;
    this.getDataAward(this.awardForm.value);
    console.log(this.award);

    this.awardsService.save(this.award).subscribe(
      award =>{
        //si se ha áñadido con exito envia un refresh al padre (para que actualize la lista)
        this.refresh_list.next(),
        //para limpiar los campos al añadir
        this.awardForm = this.fb.group({
          name: '',
          description: '',
          image: ''
        });
      },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  getDataAward(values: Object) {
    Object.assign(this.award, values);
  }

}
