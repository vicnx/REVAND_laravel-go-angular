import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserList, UserService } from '../../core';

@Component({
  selector: 'app-editor-user',
  templateUrl: './user-editor.component.html',
  styleUrls: ['user-editor.component.css']
})
export class UserEditorComponent implements OnInit {
  @Output() refresh_list = new EventEmitter<string>();
  // @Output() item = new EventEmitter<string>();
  @Input() item: UserList;
  user: UserList = {} as UserList;
  userForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;
  update = false;
  type = "Create"

  constructor(
    private usersService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      Username: '',
      Email: '',
      Image: '',
      Type: ''
    });
  }

  ngOnInit() {

    if (this.item){
      console.log(this.item);
      this.userForm = this.fb.group({
        Username: this.item.Username,
        Email: this.item.Email,
        Image: this.item.Image,
        Type: this.item.Type
      });
      //ponemos la variable UPDATE a true para controlar cuando es un update
      this.update=true;
      //sobreescribimos user con el item del binding (si lo tiene claro)
      this.user =this.item
      this.type="Update";
    }else{
      //si no tiene item pone los campos del editor vacios. (create)
      this.userForm = this.fb.group({
        Username: '',
        Email: '',
        Image: '',
        Type: ''
      });
    }
  }
  

  submitForm(event) {
    this.isSubmitting = true;
    this.getDataUser(this.userForm.value);
    console.log(this.userForm.value);
    console.log(this.user);
    console.log(event);

    if (!this.user.Image) this.user.Image = 'null';

    if (this.update){
      //esto oculta el editor cuando finalizas la edicion
      let node = event.target;
      let editor = node.parentNode.parentNode.parentNode.parentNode;
      let parent = editor.parentNode
      let btn = parent.querySelector('.oppened');
      btn.classList.remove('oppened');
      editor.style.display = 'none';
    }
    console.log("-----------------------");
    console.log(this.user);
    this.usersService.save(this.user).subscribe(
      user =>{
        //si se ha áñadido con exito envia un refresh al padre (para que actualize la lista)
        this.refresh_list.next(),
        
        //volvemos a llamar a ngoninit para que actualize los datos del update o del create
        this.ngOnInit();

      },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );

  }

  getDataUser(values: Object) {
    console.log(values);
    Object.assign(this.user, values);
  }

}
