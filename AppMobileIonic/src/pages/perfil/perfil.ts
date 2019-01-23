import { Component } from '@angular/core';
import { NavController, IonicPage, App } from 'ionic-angular';
import { ClienteDTO } from './../../models/cliente.dto';
import { ClienteService } from './../../services/domain/cliente.service';
import { AuthService } from './../../services/auth.service';
import { LocalUser } from './../../models/local_user';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  cliente: ClienteDTO;
  clienteUpdate: ClienteDTO;

  constructor(
    public navCtrl: NavController,
    public app: App,
    public authService: AuthService,
    public clienteService: ClienteService
    ) { }

  ionViewWillEnter(){
    this.loadData();
  }

  loadData(){
    let localUser: LocalUser = this.authService.getUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email) 
        .subscribe(
          response => {
            this.cliente = response;
            this.clienteUpdate = response;
        }, error => {
          if(error.status == 403) this.app.getRootNav().setRoot('LoginPage');
        });
    } else {
      this.app.getRootNav().setRoot('LoginPage');
    }
  }

  editar(){
    this.navCtrl.push('PerfilEditPage', {cliente: this.cliente});
  }

  logout(){
    this.authService.logout();
    this.app.getRootNav().setRoot('LoginPage');
  }

  pagePedidos(){
    this.navCtrl.push('PedidosPage', {clienteId: this.cliente.id});
  }

}
