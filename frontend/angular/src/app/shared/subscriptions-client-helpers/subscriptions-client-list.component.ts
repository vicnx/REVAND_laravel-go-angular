import { Component,OnInit, Input } from '@angular/core';
import { Subscription, SubscriptionService } from '../../core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'app-subscriptionsclient-list',
    styleUrls: ['subscriptions-client-list.component.css'],
    templateUrl: './subscriptions-client-list.component.html'
})

export class SubscriptionsClientListComponent{
    // isDeleting = false;
    allSubscriptions: Subscription[];
    
    constructor (
        private subscriptionService: SubscriptionService,
        private router: Router,
    ) {
        console.log("SUBSCRIPTION-CLIENT-COMPONENT-LIST");
    }

    @Input()
    set config(config: String) {
        if (config=="all") {
          this.runQuery();
        }
    }
    runQuery(){
        this.allSubscriptions = [];
        this.subscriptionService.query().subscribe((subscriptions) => {
            console.log(subscriptions);
            // console.log("object");
            // console.log(awards);
            this.allSubscriptions = subscriptions;
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