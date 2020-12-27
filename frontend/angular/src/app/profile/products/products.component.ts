import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'products-profile',
  styleUrls: ['./products.component.css'],
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  constructor() {
    // console.log("products COMPONENT");
  }
  test = "all";

  ngOnInit() {
    console.log("Productssssssss Component");
  }
}
