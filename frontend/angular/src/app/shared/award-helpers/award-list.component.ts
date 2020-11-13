import { Component,OnInit, Input } from '@angular/core';
import { Award, AwardsService } from '../../core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-award-list',
    styleUrls: ['award-list.component.css'],
    templateUrl: './award-list.component.html'
})

export class AwardListComponent{
    // isDeleting = false;
    allAwards: Award[];
    
    constructor (
        private awardsService: AwardsService,
        private router: Router,
    ) {}

    @Input()
    set config(config: String) {
        if (config=="all") {
          this.runQuery();
        }
    }
    runQuery(){
        this.allAwards = [];
        this.awardsService.query().subscribe((awards) => {
            // console.log("object");
            // console.log(awards);
            this.allAwards = awards;
        });
    }
    refresh(){
        this.runQuery()
        // Updated timezone will be available here as timezone.
    }

    // //delete award
    // deleteAward(id) {
    //     this.isDeleting = true;
    //     this.awardsService.destroy(id).subscribe(success => {
    //           this.runQuery()
    //         }
    //       );
    //   }
}