import { Component,OnInit, Input } from '@angular/core';
import { Award, AwardsService } from '../../core';

@Component({
    selector: 'app-award-list',
    // styleUrls: ['award-list.component.css'],
    templateUrl: './award-list.component.html'
})

export class AwardListComponent{
    
    constructor (
        private awardsService: AwardsService,
        // private allAwards: Award[]
    ) {}
    allAwards: Award[];
    @Input()
    set config(config: String) {
        if (config=="all") {
          this.runQuery();
        }
    }
    runQuery(){
        this.allAwards = [];
        this.awardsService.query().subscribe((awards) => {
            console.log("object");
            console.log(awards);
            this.allAwards = awards;
        });
    }
}