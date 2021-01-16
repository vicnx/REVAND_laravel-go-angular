import { Component, OnInit } from '@angular/core';

import { StatsService } from '../../core';

@Component({
  selector: 'app-dashboard-page',
  styleUrls: ['./dashboard.component.css'],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  constructor(
    private statsService: StatsService
  ) {
    console.log("Dashboard.COMPONENT");
    
  }
  test = "all";

  productsCount= 0;
  adminCount=0;
  clientCount=0;
  data = [];
  products = [];
  totalUsers = [];
  ngOnInit() {
    //get product count
    this.statsService.getStats("products").subscribe((count) => {
      this.productsCount = count;
      let products = this.makeProductsObj();
      Object.assign(this, { productsResult:products })
      this.statsService.getStats("users").subscribe((count) => {
        this.adminCount = count.admins;
        this.clientCount= count.clients;
        let data = this.makeUsersObj();
        Object.assign(this, { single:data })
        let totalUsers = this.makeTotalUsersObj();
        Object.assign(this, { totalUsersResult:totalUsers })
        

      });
      
    });
  }


  makeUsersObj(){
    this.data = [
      {
        "name": "Admins",
        "value": this.adminCount
      },
      {
        "name": "Clients",
        "value": this.clientCount
      }

    ]
    return this.data
  }

  makeProductsObj(){
    console.log(this.productsCount);
    this.products = [
      {
        "name": "Products",
        "value": this.productsCount
      }
    ]
    return this.products
  }

  makeTotalUsersObj(){
    this.totalUsers = [
      {
        "name": "Users",
        "value": this.adminCount+this.clientCount
      }
    ]
    return this.totalUsers
  }
  totalUsersResult: any[];
  productsResult: any[];
  single: any[];
  multi: any[];

  view: any[] = [700, 400];
  viewCard: any[] = [300, 200];


  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Users Type';
  showYAxisLabel = true;
  yAxisLabel = 'Total Users';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  cardColor: string = '#232837';

  onSelect(event) {
    console.log(this.single);
    console.log(event);
  }

}
