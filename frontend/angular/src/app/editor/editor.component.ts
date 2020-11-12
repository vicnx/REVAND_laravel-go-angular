import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Award, AwardsService } from '../core';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {
  // article: Article = {} as Article;
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
  }


  submitForm() {
    this.isSubmitting = true;
    console.log("Submit");
  }

}
