import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { NavController, IonicPage, ToastController } from 'ionic-angular';

import { CredenciaisDTO } from './../../models/credenciais.dto';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  credenciais : CredenciaisDTO = {
    email: "",
    senha: ""
  };
  constructor(
    public navCtrl: NavController, 
    public authService: AuthService,
    public toastCtrl: ToastController
    ) { }

  login(){
    this.authService.authenticate(this.credenciais)
      .subscribe(
        response => {
          this.authService.successfulLogin(response.headers.get('Authorization'));
          this.navCtrl.setRoot('TabsPage');
        },
        error => {
          if(error.status == 401)  {
            const toast = this.toastCtrl.create({
              message: error.message,
              duration: 3000
            });
            toast.present();
          }
        }
      );
  }

}
