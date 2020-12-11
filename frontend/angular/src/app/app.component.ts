import { Component, OnInit } from '@angular/core';
import { UserService } from './core';
// import { faUsers } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor (
    private userService: UserService
  ) {}
  title = 'angular';

  ngOnInit() {
    this.userService.populate();
  }
}
