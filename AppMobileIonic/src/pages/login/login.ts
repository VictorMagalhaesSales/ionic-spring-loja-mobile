import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { CredenciaisDTO } from './../../models/credenciais.dto';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  credenciais : CredenciaisDTO = {
    email: "victormagalhaessales@gmail.com",
    senha: "123"
  };
  constructor(
    public navCtrl: NavController, 
    public authService: AuthService
    ) { }

  login(){
    this.authService.authenticate(this.credenciais)
      .subscribe(
        response => {
          this.authService.successfulLogin(response.headers.get('Authorization'));
          this.navCtrl.setRoot('TabsPage');
        },
        error => {}
      );
  }

  ionViewDidEnter() {
    this.authService.refreshToken()
      .subscribe(response => {
        this.authService.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('TabsPage');
      },
      error => {}
      );  
  }

  signup(){
    this.navCtrl.push('SignupPage');
  }

}
