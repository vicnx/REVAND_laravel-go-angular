import { Component,OnInit, Input } from '@angular/core';
import { Award, AwardsService,NotificationService } from '../../core';
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
        private notification: NotificationService,

    ) {}

    @Input()
    set config(config: String) {
        if (config=="all") {
          this.runQuery();
        }
    }
    runQuery(){
        this.notification.showWarning("Todos los cambios realizados aqui podrian afectar a la app","Cuidado")
        this.allAwards = [];
        this.awardsService.query().subscribe((awards) => {

            this.allAwards = awards['data'];
        });
    }
    refresh(){
        this.runQuery()
        // Updated timezone will be available here as timezone.
    }

    func(){
        console.log("DENTRO DEL LIST COMPONENT F");
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