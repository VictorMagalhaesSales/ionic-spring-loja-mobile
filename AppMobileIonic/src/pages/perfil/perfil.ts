import { AuthService } from './../../services/auth.service';
import { LocalUser } from './../../models/local_user';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {

  email: string;

  constructor(public navCtrl: NavController, public authService: AuthService) { }

  ionViewDidLoad(){
    let localUser: LocalUser = this.authService.getUser();
    this.email = localUser.email;
  }

}
