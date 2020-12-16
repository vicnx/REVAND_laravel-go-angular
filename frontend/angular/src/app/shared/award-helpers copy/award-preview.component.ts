import { Component, Input,Output, EventEmitter, ViewChild, ElementRef, ComponentFactoryResolver, Injector, ApplicationRef, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Award, AwardsService } from '../../core';
import { AwardEditorComponent} from './award-editor.component'
// import { Award, AwardsService } from '../../../assets/logo-web.png';

@Component({
  selector: 'app-award-preview',
  styleUrls: ['award-preview.component.css'],
  templateUrl: './award-preview.component.html'
})
export class AwardPreviewComponent{
  @Input() award: Award;
  @Output() refresh_list = new EventEmitter<string>();
  @Output() item = new EventEmitter<Award>();
  constructor (
    private awardsService: AwardsService,
    ){}

  // @Input() test: Award;
  isDeleting = false;

    deleteAward() {
      
        this.isDeleting = true;
        this.awardsService.destroy(this.award.id).subscribe(success => {
            
            //enviamos un emit al parent. (lo recoge en award-list component)
            this.refresh_list.next();
        }
        );
    }


    
    modify(event) {
      // let factory = this.resolver.resolveComponentFactory(AwardEditorComponent);
      // console.log(this.award);
      let node = event.target;
      let nodeParent = node.parentNode.parentNode.parentNode.parentNode;
      let editor = nodeParent.querySelector('app-editor-award');

      this.item.next();

      if (node.classList.contains('oppened')) {
        node.classList.remove('oppened');
        editor.style.display = 'none'
      }else{
        node.classList.add('oppened');
        editor.style.display = 'unset'
      }
      
      



      // console.log("=====================");
      // console.log(node.parentNode.parentNode.parentNode.parentNode);
      // var doc = new DOMParser().parseFromString('<app-editor-award [item]="'+this.award+'"></app-editor-award>', 'text/html');
      // let editor = doc.body.firstChild;
      // console.log(editor);
      // node.parentNode.parentNode.parentNode.parentNode.insertBefore(editor, node.parentNode.parentNode.parentNode.nextSibling);
      // const ref = factory.create(this.injector, [], editor);
      // this.app.attachView(ref.hostView);
      // this.item.next();
      // node.parentNode.parentNode.parentNode.style.display = "none"
    }

}