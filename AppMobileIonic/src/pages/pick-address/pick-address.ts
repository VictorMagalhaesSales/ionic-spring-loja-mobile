import { AuthService } from './../../services/auth.service';
import { ClienteService } from './../../services/domain/cliente.service';
import { EnderecoDTO } from './../../models/endereco.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public clienteService: ClienteService,
    public authService: AuthService,
    public app: App) {
  }

  ionViewDidLoad() {
    let localUser = this.authService.getUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response.enderecos;
        },
        error => {
          if (error.status == 403) this.app.getRootNav().setRoot('LoginPage');
        });
      }
      else {
        this.app.getRootNav().setRoot('LoginPage');
      }
  }

}
