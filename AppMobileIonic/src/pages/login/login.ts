import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { CredenciaisDTO } from './../../models/credenciais.dto';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  creds : CredenciaisDTO = {
    email: "",
    senha: ""
  };
  constructor(public navCtrl: NavController) { }

  login(){
    console.log(this.creds);
    this.navCtrl.setRoot('TabsPage')
  }

}
