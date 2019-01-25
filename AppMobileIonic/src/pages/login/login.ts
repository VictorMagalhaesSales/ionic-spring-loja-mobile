import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController, NavParams } from 'ionic-angular';

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
    public navParams: NavParams,
    public authService: AuthService,
    public loadingCtrl: LoadingController
    ) { }

  login(){
    let loader = this.presentLoading();
    this.authService.authenticate(this.credenciais)
      .subscribe(
        response => {
          loader.dismiss();
          this.authService.successfulLogin(response.headers.get('Authorization'));
          this.navCtrl.setRoot('TabsPage');
        },
        error => {loader.dismiss()}
      );
  }

  ionViewCanEnter() {
    let loader = this.presentLoading();
    this.authService.refreshToken()
      .subscribe(response => {
        loader.dismiss();
        this.authService.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('TabsPage');
      },
      error => {loader.dismiss()}
      );
  }

  signup(){
    this.navCtrl.push('SignupPage');
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    loader.present();
    return loader;
  }

}
