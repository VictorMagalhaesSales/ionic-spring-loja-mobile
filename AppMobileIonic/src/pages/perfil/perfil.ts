import { ClienteDTO } from './../../models/cliente.dto';
import { ClienteService } from './../../services/domain/cliente.service';
import { AuthService } from './../../services/auth.service';
import { LocalUser } from './../../models/local_user';
import { Component } from '@angular/core';
import { NavController, IonicPage, App } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {

  cliente: ClienteDTO;

  constructor(
    public navCtrl: NavController,
    public app: App,
    public authService: AuthService,
    public clienteService: ClienteService
    ) { }

  ionViewDidLoad(){
    let localUser: LocalUser = this.authService.getUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email) 
        .subscribe(
          response => {
            this.cliente = response;
        }, error => {
          if (error.status == 403) this.navCtrl.setRoot('LoginPage');
        });
    } else {
      this.navCtrl.setRoot('LoginPage');
    }
  }

  sair(){
    this.authService.logout();
    this.app.getRootNav().setRoot('LoginPage');
  }

}
