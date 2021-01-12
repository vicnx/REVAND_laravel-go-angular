import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Award, AwardsService,NotificationService } from '../../../core';

@Component({
  selector: 'app-editor-award-page',
  templateUrl: './editor-award.component.html'
})
export class EditorAwardComponent implements OnInit {
  award: Award = {} as Award;
  awardForm: FormGroup;
  // tagField = new FormControl();
  errors: Object = {};
  isSubmitting = false;

  constructor(
    private awardsService: AwardsService,
    private notification: NotificationService,
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
    console.log("hola");
    this.notification.showWarning("Cuidado cualquier modificación aqui puede alterar el comportamiento de la app", "Warning")
    this.route.data.subscribe((data: { award: Award }) => {
      if (data.award) {
        this.award = data.award;
        this.awardForm.patchValue(data.award);
      }
    });
  }


  submitForm() {
    console.log("WDHIAODBAWKDAWBDIUANWIKDBAWIDBBAWDDAWDAWDAWD");
    this.isSubmitting = true;
    console.log("Submit");
    this.getDataAward(this.awardForm.value);
    console.log(this.award);

    this.awardsService.save(this.award).subscribe(
      award => {
        console.log("WDHIAODBAWKDAWBDIUANWIKDBAWIDBBAWDDAWDAWDAWD");
        this.notification.showSuccess("Creado con exito", "Success")
        this.router.navigateByUrl('admin-panel/awards')
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
