import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Award, AwardsService } from '../../../core';

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
    console.log("Editor");
    this.route.data.subscribe((data: { award: Award }) => {
      if (data.award) {
        this.award = data.award;
        this.awardForm.patchValue(data.award);
      }
    });
  }


  submitForm() {
    this.isSubmitting = true;
    console.log("Submit");
    this.getDataAward(this.awardForm.value);
    console.log(this.award);

    this.awardsService.save(this.award).subscribe(
      award => this.router.navigateByUrl('admin-panel/awards'),
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
