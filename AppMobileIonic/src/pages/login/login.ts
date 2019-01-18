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
    email: "",
    senha: ""
  };
  constructor(public navCtrl: NavController, public authService: AuthService) { }

  login(){
    this.authService.authenticate(this.credenciais)
      .subscribe(
        sucess =>  this.navCtrl.setRoot('TabsPage'),
        error => {}
      );
   
  }

}
