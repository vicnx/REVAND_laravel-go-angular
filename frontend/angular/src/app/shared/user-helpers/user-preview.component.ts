import { Component, Input,Output, EventEmitter, ViewChild, ElementRef, ComponentFactoryResolver, Injector, ApplicationRef, Renderer2 } from '@angular/core';
import { UserList, UserService } from '../../core';
// import { User, UsersService } from '../../../assets/logo-web.png';

@Component({
  selector: 'app-user-preview',
  styleUrls: ['user-preview.component.css'],
  templateUrl: './user-preview.component.html'
})
export class UserPreviewComponent{
  @Input() user: UserList;
  @Output() refresh_list = new EventEmitter<string>();
  @Output() item = new EventEmitter<UserList>();
  constructor (
    private usersService: UserService,
    ){}

  // @Input() test: User;
  isDeleting = false;

    // deleteUser() {
      
    //     this.isDeleting = true;
    //     this.usersService.destroy(this.user.id).subscribe(success => {
            
    //         //enviamos un emit al parent. (lo recoge en user-list component)
    //         this.refresh_list.next();
    //     }
    //     );
    // }


    
    modify(event) {
      // let factory = this.resolver.resolveComponentFactory(UserEditorComponent);
      // console.log(this.user);
      let node = event.target;
      let nodeParent = node.parentNode.parentNode.parentNode.parentNode;
      let editor = nodeParent.querySelector('app-editor-user');

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
      // var doc = new DOMParser().parseFromString('<app-editor-user [item]="'+this.user+'"></app-editor-user>', 'text/html');
      // let editor = doc.body.firstChild;
      // console.log(editor);
      // node.parentNode.parentNode.parentNode.parentNode.insertBefore(editor, node.parentNode.parentNode.parentNode.nextSibling);
      // const ref = factory.create(this.injector, [], editor);
      // this.app.attachView(ref.hostView);
      // this.item.next();
      // node.parentNode.parentNode.parentNode.style.display = "none"
    }

}