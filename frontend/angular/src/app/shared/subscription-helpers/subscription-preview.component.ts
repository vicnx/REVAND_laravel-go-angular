import { Component, Input,Output, EventEmitter, ViewChild, ElementRef, ComponentFactoryResolver, Injector, ApplicationRef, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, SubscriptionService } from '../../core';
import { SubscriptionEditorComponent} from './subscription-editor.component'
// import { Award, AwardsService } from '../../../assets/logo-web.png';

@Component({
  selector: 'app-subscription-preview',
  styleUrls: ['subscription-preview.component.css'],
  templateUrl: './subscription-preview.component.html'
})
export class SubscriptionPreviewComponent{
  @Input() subscription: Subscription;
  @Output() refresh_list = new EventEmitter<string>();
  @Output() item = new EventEmitter<Subscription>();
  constructor (
    private subscriptionsService: SubscriptionService,
    private element: ElementRef,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private app: ApplicationRef,
    private renderer: Renderer2,
    ){}

  // @Input() test: Award;
  isDeleting = false;

    deleteSub() {
      
        this.isDeleting = true;
        this.subscriptionsService.destroy(this.subscription.id).subscribe(success => {
            
            //enviamos un emit al parent. (lo recoge en award-list component)
            this.refresh_list.next();
        }
        );
    }

    // test(event) {
    //   let factory = this.resolver.resolveComponentFactory(AwardEditorComponent);
    //   console.log(this.award);
    //   var doc = new DOMParser().parseFromString('<app-editor-award [item]="'+this.award.id+'"></app-editor-award>', 'text/html');
    //   let editor = doc.body.firstChild;
    //   console.log(editor);
    //   let node = event.target;
    //   node.disabled = 'true';

    //   node.parentNode.parentNode.parentNode.parentNode.insertBefore(editor, node.parentNode.parentNode.parentNode.nextSibling);
    //   const ref = factory.create(this.injector, [], editor);
    //   this.app.attachView(ref.hostView);
    //   // node.parentNode.parentNode.parentNode.style.display = "none"
    // }

}