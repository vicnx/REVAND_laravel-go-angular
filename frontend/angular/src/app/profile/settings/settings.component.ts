import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService,NotificationService } from '../../core';
import { Location } from "@angular/common";



@Component({
  selector: 'settings-profile',
  styleUrls: ['./settings.component.css'],
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private notification: NotificationService,
    private location: Location,

  ) {
    this.settingsForm = this.fb.group({
      username: '',
      bio: '',
      image: ''
    });
  }
  isSubmitting = false;
  currentUser: User;
  profile:String;
  canAccess = false;
  settingsForm: FormGroup;
  ngOnInit() {
    this.profile = location.pathname.split('/',5)[2];
    //obtenemos el usuario actual
    this.userService.currentUser.subscribe(
      (userData)=> {
        this.currentUser = userData;
        console.log(this.currentUser);
        if(this.currentUser.username==this.profile){
          this.canAccess=true;
          this.settingsForm = this.fb.group({
            username: this.currentUser.username,
            bio: this.currentUser.bio,
            image: this.currentUser.image
          });
        }else{
          this.notification.showError("No estas autorizado","ERROR")
          this.router.navigateByUrl('/');
        }
      })
  }


  getDataProfile(values: Object) {
    console.log(this.currentUser);
    Object.assign(this.currentUser, values);
  }

  submitForm() {
    this.isSubmitting = true;
    this.getDataProfile(this.settingsForm.value);

    if (!this.currentUser.image) this.currentUser.image = 'null';
    this.userService.save(this.currentUser).subscribe(
      user =>{
        this.notification.showSuccess("actiualizado con exito", "Success")
        //volvemos a llamar a ngoninit para que actualize los datos del update o del create
        this.ngOnInit();
      },
      err => {
        this.notification.showError("Actualziar ha fallado", "Error")
        // this.errors = err;
        this.isSubmitting = false;
      }
    );

  }






}
