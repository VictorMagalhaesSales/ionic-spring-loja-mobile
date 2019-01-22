import { PedidoDTO } from './../../models/pedido.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoService } from './../../services/domain/pedido.service';

@IonicPage()
@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
})
export class PedidosPage {

  listPedidos: PedidoDTO[] = []

  constructor(
    public pedidoService: PedidoService,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.loadData();
    this.listPedidos.forEach(x => console.log(x.instante));
  }

  loadData(){
    this.pedidoService.findByCliente(this.navParams.data.clienteId)
      .subscribe(
        response => {
          this.listPedidos = response;
        }
      )
  }

}
