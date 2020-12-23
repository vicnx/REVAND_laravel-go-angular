import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'settings-profile',
  styleUrls: ['./settings.component.css'],
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  constructor() {
    console.log("settings COMPONENT");
  }
  test = "all";

  ngOnInit() {
    console.log("Setinggs Component");
  }
}
